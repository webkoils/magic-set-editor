// @ts-nocheck
import { MseCard, MseCardSet } from '@mse/types';
import {
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
import {
  client,
  DatabaseCardRow,
  DatabaseCardSetRow,
  toCamelCaseMap,
  toSnakeCaseMap,
  transformCardInput,
} from './remote/index';
import { MutatorCallback, MutatorOptions } from 'swr';
import { autoNumberCardSet, getCardIdentity } from '@mse/utils.card';
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
        const updatedSet = {
          ...toSnakeCaseMap(updates),
          id: cardSetId,
          user_id: session.user.id,
          updated_at: new Date().toISOString(),
        } as DatabaseCardSetRow;
        await mutateSet(updatedSet);
        mutateCardSet(() => {
          return { data: updatedSet };
        }, false);
      }
    },
    [mutateSet, cardSetId, mutateCardSet, session?.user.id]
  );
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const filters = useCardSetFilters();

  const addCard = useCallback(async () => {
    if (typeof session?.user.id !== 'undefined') {
      const { data: newCard } = await client
        .from('cards')
        .insert({
          ...transformCardInput({ cardSetId }, 'insert'),
          user_id: session.user.id,
        })
        .select('*')
        .single();
      if (newCard) {
        await mutateCards(
          (cs) => {
            const newEntries = [...(cs?.data || []), newCard];
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
      await client
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
    const setData = toCamelCaseMap<DatabaseCardSetRow, MseCardSet>(
      data
    ) as MseCardSet;

    return setData;
  }, [data]);

  const cards = useMemo(() => {
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
    if (filters?.sorter) {
      return cards.slice().sort(filters?.sorter);
    }
    return cards;
  }, [cards, filters?.sorter]);
  const onCardUpdate = useCallback(
    async (cardId: number, updatedCard: Partial<DatabaseCardRow> | null) => {
      if (updatedCard !== null) {
        mutateCards(
          (cs: any) => {
            if (!cs || !cs.data) {
              return {
                data: [updatedCard],
                count: 1,
              };
            }
            const cardIndex = cs.data?.findIndex((c: any) => c.id === cardId);
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
            const cardIndex = cs.data?.findIndex((c: any) => c.id === cardId);
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
    [mutateCards]
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
