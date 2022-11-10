//@ts-nocheck
import { MseCard, MseCardSet } from '@mse/types';
import {
  useInsertMutation,
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-swr';
import { useSession } from '@supabase/auth-helpers-react';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { paramCase } from 'change-case';
import {
  client,
  DatabaseCardRow,
  DatabaseCardSetRow,
  DatabaseCardUpdate,
  toCamelCaseMap,
  toSnakeCaseMap,
  transformCardInput,
  transformCardOutput,
  transformCardSetOutput,
} from './remote';
import { MutatorCallback, MutatorOptions } from 'swr';
import { autoNumberCardSet, getCardIdentity } from '@mse/utils/card';
import { useCardSetFilters } from './CardSetFilters';
export declare type KeyedMutator<Data> = (
  data?:
    | { data: Data; count?: number }
    | Promise<{ data: Data; count?: number }>
    | MutatorCallback<{ data: Data; count?: number }>,
  opts?: boolean | MutatorOptions<{ data: Data; count?: number }>
) => Promise<Data | undefined>;

export const useCardSetState = (cardSetId: string) => {
  const session = useSession();

  const { data, mutate: mutateCardSetLocal } = useQuery(
    client.from('card_sets').select(`*`).eq('id', cardSetId),
    'single'
  );
  const mutateCardSet = mutateCardSetLocal as KeyedMutator<DatabaseCardSetRow>;

  const { data: cardsData, mutate } = useQuery(
    client.from('cards').select(`*`).eq('card_set_id', cardSetId),
    'multiple'
  );
  const mutateCards = mutate as KeyedMutator<DatabaseCardRow[]>;

  const [mutateSet] = useUpdateMutation(client.from('card_sets'), ['id']);
  const updateCardSet = useCallback(
    async (updates: MseCardSet) => {
      if (typeof session?.user.id !== 'undefined') {
        let updatedSet = {
          ...toSnakeCaseMap(updates),
          id: cardSetId,
          user_id: session.user.id!,
          updated_at: new Date().toISOString(),
        } as DatabaseCardSetRow;
        await mutateSet(updatedSet);
        mutateCardSet(() => {
          return { data: updatedSet };
        }, false);
      }
    },
    [mutateSet, cardSetId, mutateCardSet]
  );
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const filters = useCardSetFilters();

  const addCard = useCallback(async () => {
    console.log('add card');
    if (typeof session?.user.id !== 'undefined') {
      const { data: newCard } = await client
        .from('cards')
        .insert({
          ...transformCardInput({ cardSetId }, 'insert'),
          user_id: session.user.id!,
        })
        .select('*')
        .single();
      if (newCard) {
        await mutateCards(
          (cs) => {
            let newEntries = [...(cs?.data || []), newCard];
            return { data: newEntries, count: newEntries.length };
          },
          { revalidate: false }
        );
        return newCard;
      }
    }
  }, [cardSetId, session, mutateCards]);

  const deleteCards = useCallback(
    async (cardIds: number[]) => {
      const result = await client
        .from('cards')
        .delete()
        .in(
          'id',
          cardIds.map((id) => Number(id))
        );
      mutateCards(
        (cs: any) => {
          if (!cs || !cs.data) {
            return { data: [], count: 0 };
          }
          console.log(cardIds, cs.data);
          const newCards = cs.data.filter(
            (c: DatabaseCardRow) => !cardIds.includes(c.id)
          );
          return {
            data: newCards,
            count: newCards.length,
          };
        },
        { revalidate: false }
      );
    },
    [mutateCards]
  );

  const cardSet = useMemo(() => {
    if (!data) {
      return null;
    }
    let setData = toCamelCaseMap<DatabaseCardSetRow, MseCardSet>(
      data
    ) as MseCardSet;

    return setData;
  }, [data]);

  const cards = useMemo(() => {
    console.log({ cardsData });
    if (cardsData) {
      return autoNumberCardSet(
        cardsData.map(toCamelCaseMap<DatabaseCardRow, MseCard>).map(
          (c) =>
            ({
              ...(c as MseCard),
              identity: getCardIdentity(c as MseCard),
            } as MseCard)
        )
      );
    }
    return [];
  }, [cardsData]);

  const sortedAndFilteredCards = useMemo(() => {
    if (filters) {
      return cards.slice().sort(filters?.sorter);
    }
    return cards;
  }, [cards, filters?.sorter]);
  const onCardUpdate = useCallback(
    async (cardId: number, updatedCard: Partial<DatabaseCardRow> | null) => {
      console.log(updatedCard);
      if (updatedCard !== null) {
        mutateCards(
          (cs: any) => {
            if (!cs || !cs.data) {
              return {
                data: [updatedCard],
                count: 1,
              };
            }
            let cardIndex = cs.data?.findIndex((c: any) => c.id === cardId);
            return {
              data: [
                ...cs.data.slice(0, cardIndex),
                { ...cs.data[cardIndex], ...toSnakeCaseMap(updatedCard) },
                ...cs.data.slice(cardIndex + 1),
              ],
              count: cs.count,
            };
          },
          { revalidate: false }
        );
      } else {
        mutateCards(
          (cs: any) => {
            if (!cs || !cs.data) {
              return cs;
            }
            let cardIndex = cs.data?.findIndex((c: any) => c.id === cardId);
            return {
              data: [
                ...cs.data.slice(0, cardIndex),
                ...cs.data.slice(cardIndex + 1),
              ],
              count: cs.count - 1,
            };
          },
          { revalidate: false }
        );
      }
    },
    [mutateCards, cardSetId]
  );

  return useMemo(
    () => ({
      cardSet,
      cards,
      sortedAndFilteredCards,
      updateCardSet,
      onCardUpdate,
      addCard,
      filters,
      activeCardId,
      setActiveCardId,
      deleteCards,
    }),
    [
      cardSet,
      cards,
      updateCardSet,
      activeCardId,
      sortedAndFilteredCards,
      onCardUpdate,
      addCard,
      filters,
      deleteCards,
    ]
  );
};
const CardSetContext = React.createContext<
  ReturnType<typeof useCardSetState> | undefined
>(undefined);

export const CardSetStateProvider: React.FC<
  PropsWithChildren<{ cardSetId: string }>
> = ({ cardSetId, children }) => {
  const state = useCardSetState(cardSetId);

  return (
    <CardSetContext.Provider value={state}>{children}</CardSetContext.Provider>
  );
};
export const useCardSetContext = () => {
  const state = useContext(CardSetContext);
  if (typeof state === 'undefined') {
    throw new Error('wrap in <CardSetStateProvider>');
  }
  return state;
};
