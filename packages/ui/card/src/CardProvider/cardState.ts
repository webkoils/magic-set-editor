import { MseCard } from '@mse/types';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

export interface CardStateHistoryItem {
  card: MseCard;
  timestamp: number;
}

export interface CardState {
  initialCard: MseCard;
  card: MseCard;
  history: [CardStateHistoryItem[], CardStateHistoryItem[]];
  editable: boolean;
  editField: null | keyof MseCard;
}

export type CardStateAction =
  | {
      type: 'update';
      card: Partial<MseCard>;
    }
  | { type: 'click'; field: null | keyof MseCard }
  | { type: 'reset' }
  | { type: 'undo' }
  | { type: 'redo' };

export const cardStateReducer: React.Reducer<CardState, CardStateAction> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'click': {
      if (prevState.editField === action.field) {
        return { ...prevState, editField: null };
      } else {
        return { ...prevState, editField: action.field };
      }
    }
    case 'reset': {
      return {
        ...prevState,
        card: prevState.initialCard,
        history: [[{ card: prevState.initialCard, timestamp: 0 }], []],
      };
    }
    case 'update': {
      const newCard = { ...prevState.card, ...action.card };
      let history = prevState.history.slice()[0];
      let prevCard = history.pop();
      console.log(prevCard);
      if (!prevCard || Date.now() - prevCard.timestamp > 500) {
        history.push({ card: newCard, timestamp: Date.now() });
      }
      return {
        ...prevState,
        card: newCard,
        history: [history, []],
      };
    }
    case 'undo': {
      let history = prevState.history.slice()[0];
      let future = prevState.history.slice()[1];
      let prevCard = history.pop();

      if (prevCard) {
        future.push(prevCard);
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
        history.push(nextCard);
        return {
          ...prevState,
          card: nextCard.card,
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
    history: [[{ card, timestamp: 0 }], []],
    editable: !!editable,
    editField: null,
  });

  const update = useCallback((updates: Partial<MseCard>) => {
    dispatch({ type: 'update', card: updates });
  }, []);
  const onFieldClick = useCallback((field: CardState['editField']) => {
    dispatch({ type: 'click', field });
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
      onFieldClick,
    }),
    [state, dispatch, update, reset, undo, redo, onFieldClick]
  );
};
