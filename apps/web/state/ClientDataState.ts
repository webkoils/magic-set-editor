import {
  atom,
  DefaultValue,
  useRecoilState,
  selector,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';

import { selectorFamily } from 'recoil';
import { useChangeHistoryState } from './ChangeHistory';
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useIsClient } from '@mse/utils/ssr';
import { saveStateToCache, loadCachedState } from './utils';

import { MseCard, MseCardSet, MseCardSetWithCards } from '@mse/types';
import * as db from '@mse/supabase';
import { useSession } from '@supabase/auth-helpers-react';
import sampleCards from '@mse/sample-cards';

export interface ClientState {
  lastFetched: number;
  lastUpdated: number;
  sets: Record<string, MseCardSet>;
  cards: Record<string, MseCard>;
}

const ClientDataStateR = atom<ClientState>({
  key: 'ClientState',
  default: {
    lastFetched: 0,
    lastUpdated: 0,
    sets: {},
    cards: Object.fromEntries(sampleCards.map((c) => [c.id, c])),
  },
});

const ClientDataSetsStateR = selector<Record<string, MseCardSet>>({
  key: 'ClientDataSetsState',
  get: ({ get }) => {
    return get(ClientDataStateR).sets || {};
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return set(ClientDataStateR, (state) => ({ ...state, sets: {} }));
    }
    return set(ClientDataStateR, (state) => ({ ...state, sets: newValue }));
  },
});
const ClientDataCardsStateR = selector<Record<string, MseCard>>({
  key: 'ClientDataCardsState',
  get: ({ get }) => {
    return get(ClientDataStateR).cards || {};
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return set(ClientDataStateR, (state) => ({ ...state, cards: {} }));
    }
    return set(ClientDataStateR, (state) => ({ ...state, cards: newValue }));
  },
});
const CardSetStateR = selectorFamily<MseCardSet, string>({
  key: 'CardSetState',
  get: (setId: string) => ({ get }) => {
    const sets = get(ClientDataStateR)?.sets || {};
    const cardSet = sets[setId];
    if (!cardSet) {
      throw new Error('Could not find card set with id:' + setId);
    }

    return cardSet;
  },
  set: (setId: string) => ({ set }, updatedCardSet) => {
    if (updatedCardSet instanceof DefaultValue) {
      set(ClientDataStateR, (prevVal) => ({
        ...prevVal,
      }));
    } else {
      set(ClientDataStateR, (prevVal) => ({
        ...prevVal,
        sets: { ...prevVal.sets, [setId]: updatedCardSet },
      }));
    }
  },
});

const CardSetWithCardsStateR = selectorFamily<MseCardSetWithCards, string>({
  key: 'CardSetWithCardsState',
  get: (setId: string) => ({ get }) => {
    const clientState = get(ClientDataStateR);
    const cardSet = clientState.sets[setId];
    if (!cardSet) {
      throw new Error('Could not find card with id:' + setId);
    }
    const cardsInSet = Object.values(clientState.cards).filter(
      (c) => c.cardSetId === setId
    );
    return { ...cardSet, cards: cardsInSet };
  },
  set: (setId: string) => ({ set }, updatedCardSet) => {
    if (!(updatedCardSet instanceof DefaultValue)) {
      set(ClientDataStateR, (prevVal) => ({
        ...prevVal,
        sets: { ...prevVal.sets, [setId]: updatedCardSet },
      }));
    }
  },
});

const CardStateR = selectorFamily<MseCard | null, string>({
  key: 'CardState',
  get: (cardId: string) => ({ get }) => {
    const cards = get(ClientDataStateR)?.cards || {};
    const card = cards[cardId];
    if (!card) {
      return null;
    }
    return card;
  },
  set: (cardId: string) => ({ set }, updatedCard) => {
    if (!(updatedCard instanceof DefaultValue)) {
      if (updatedCard) {
        set(ClientDataStateR, (prevVal) => ({
          ...prevVal,
          cards: { ...prevVal.cards, [cardId]: updatedCard },
        }));
      }
    }
  },
});

export const useClientStateLoader = () => {
  const prevUpdated = useRef<number>(0);
  const [state, setState] = useRecoilState(ClientDataStateR);
  const isClient = useIsClient();

  useEffect(() => {
    if (isClient) {
      let cache = loadCachedState();
      if (cache) {
        setState(cache);
      } else {
        setState({
          lastFetched: Date.now(),
          lastUpdated: Date.now(),
          cards: {},
          sets: {
            '1': {
              displayName: 'basic',
              id: '1234',
              slug: '1234',
              userId: '1',
            },
          },
        });
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (
      isClient &&
      state?.lastUpdated > 0 &&
      state.lastUpdated !== prevUpdated.current
    ) {
      prevUpdated.current = state.lastUpdated;
      saveStateToCache(state);
    }
  }, [isClient, state]);

  return state;
};

export const useMseClient = () => {
  const session = useSession();
  const setState = useSetRecoilState(ClientDataStateR);
  const cards = useRecoilValue(ClientDataCardsStateR);
  console.log({ cards });
  const addCard = useCallback(
    (setId?: string) => {
      const cardInput: MseCard = {
        id: 'temp_' + Date.now(),
        name: '',
        types: '',
        subtypes: '',

        templateId: 'default',
        cardSetId: setId,
        userId: session?.user.id || 'anon',
      };
      setState((prevVal) => ({
        ...prevVal,
        cards: { ...prevVal.cards, [cardInput.id]: cardInput },
      }));
    },
    [setState, session?.user]
  );
  const updateCard = useCallback(
    (updates: Partial<Omit<MseCard, 'id'>> & { id: string }) => {
      console.log(updates);
      setState((prevVal) => ({
        ...prevVal,
        cards: {
          ...prevVal.cards,
          [updates.id]: { ...prevVal.cards[updates.id], ...updates },
        },
      }));
    },
    [setState]
  );
  const deleteCard = useCallback((cardId: string) => {
    setState((prevVal) => {
      let newCards = { ...prevVal.cards };
      delete newCards[cardId];
      return {
        ...prevVal,
        cards: newCards,
      };
    });
  }, []);

  const addSet = useCallback(
    (input: Pick<MseCardSet, 'displayName' | 'slug'>) => {
      const setInput: MseCardSet = {
        id: 'temp_' + Date.now(),
        ...input,
        userId: session?.user.id || 'anon',
      };
      setState((prevVal) => ({
        ...prevVal,
        sets: { ...prevVal.sets, [setInput.id]: setInput },
      }));
    },
    [setState, session?.user]
  );
  const updateSet = useCallback(
    (updates: Partial<Omit<MseCardSet, 'id'>> & { id: string }) => {
      setState((prevVal) => ({
        ...prevVal,
        sets: {
          ...prevVal.sets,
          [updates.id]: { ...prevVal.sets[updates.id], ...updates },
        },
      }));
    },
    [setState]
  );
  const deleteSet = useCallback((setId: string) => {
    setState((prevVal) => {
      let newSets = { ...prevVal.sets };
      delete newSets[setId];
      return {
        ...prevVal,
        sets: newSets,
      };
    });
  }, []);

  return useMemo(
    () => ({
      cards: cards,
      addCard,
      updateCard,
      deleteCard,
      addSet,
      updateSet,
      deleteSet,
    }),
    [addCard, updateCard, deleteCard, addSet, updateSet, deleteSet, cards]
  );
};

export const useCardSetState = (setId: string) => {
  const [cardSet, setCardSet] = useRecoilState(CardSetStateR(setId));
  const [allCards, setAllCards] = useRecoilState(ClientDataCardsStateR);

  const cards = useMemo(() => {
    return Object.values(allCards).filter((c) => c.cardSetId === setId);
  }, [allCards, setId]);

  return useMemo(() => ({ cardSet, cards }), [cards, cardSet]);
};

export const useCardState = (cardId: string) => {
  return useRecoilState(CardStateR(cardId));
};
