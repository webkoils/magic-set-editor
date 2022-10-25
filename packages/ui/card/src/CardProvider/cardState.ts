import { MseCard } from '@mse/types';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

export interface CardState {
  initialCard: MseCard;
  card: MseCard;
  history: [MseCard[], MseCard[]];
  editable: boolean;
}

export type CardStateAction =
  | {
      type: 'update';
      card: Partial<MseCard>;
    }
  | { type: 'reset' }
  | { type: 'undo' }
  | { type: 'redo' };

export const cardStateReducer: React.Reducer<CardState, CardStateAction> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'reset': {
      return { ...prevState, card: prevState.initialCard, history: [[], []] };
    }
    case 'update': {
      return {
        ...prevState,
        card: { ...prevState.card, ...action.card },
        history: [
          prevState.history[0].concat({
            ...prevState.card,
            ...action.card,
          }),
          [],
        ],
      };
    }
    case 'undo': {
      let history = prevState.history.slice()[0];
      let future = prevState.history.slice()[1];
      let prevCard = history.pop();

      if (prevCard) {
        future.push(prevState.card);
        return {
          ...prevState,
          card: prevCard,
          history: [history, future],
        };
      }
      break;
    }
    case 'redo': {
      let history = prevState.history.slice()[0];
      let future = prevState.history.slice()[1];
      let nextCard = future.pop();

      if (nextCard) {
        history.push(prevState.card);
        return {
          ...prevState,
          card: nextCard,
          history: [history, future],
        };
      }
      break;
    }
    default: {
      break;
    }
  }
  return prevState;
};

export const useCardState = (card: MseCard, editable?: boolean) => {
  const [state, dispatch] = useReducer(cardStateReducer, {
    initialCard: card,
    card,
    history: [[], []],
    editable: !!editable,
  });

  const update = useCallback((updates: Partial<MseCard>) => {
    dispatch({ type: 'update', card: updates });
  }, []);
  const undo = useCallback(() => {
    dispatch({ type: 'undo' });
  }, []);
  const redo = useCallback(() => {
    dispatch({ type: 'redo' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);
  useEffect(() => {
    console.log(state);
  }, [state]);
  return useMemo(
    () => ({
      ...state,
      dispatch,
      update,
      reset,
      undo,
      redo,
    }),
    [state, dispatch, update, reset, undo, redo]
  );
};
