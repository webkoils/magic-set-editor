import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

export interface ChangeHistoryItem<T> {
  value: T;
  timestamp: number;
}

export interface ChangeHistory<T> {
  initialValue: T;
  past: ChangeHistoryItem<T>[];
  future: ChangeHistoryItem<T>[];
  current: ChangeHistoryItem<T>;
  maxLength?: number;
}

export type ChangeHistoryAction<T> =
  | {
      type: 'update';
      updates: Partial<T>;
    }
  | { type: 'reset'; initialValue?: T }
  | { type: 'undo' }
  | { type: 'redo' };

export function historyStateReducer<T>(
  prevState: ChangeHistory<T>,
  action: ChangeHistoryAction<T>
): ChangeHistory<T> {
  let nextState = { ...prevState };
  switch (action.type) {
    case 'reset': {
      nextState = {
        ...prevState,
        initialValue: action.initialValue || prevState.initialValue,
        past: [],
        current: {
          value: action.initialValue || prevState.initialValue,
          timestamp: Date.now(),
        },
        future: [],
      };
      break;
    }
    case 'update': {
      const currentItem = prevState.current;
      const newValue = { ...currentItem.value, ...action.updates };
      let past = prevState.past.slice();
      past.push(currentItem);

      nextState = {
        ...prevState,
        current: { value: newValue, timestamp: Date.now() },
        past,
        future: [],
      };
      break;
    }
    case 'undo': {
      const currentItem = prevState.current;
      let past = prevState.past.slice();
      let future = prevState.future.slice();
      let prevItem = past.pop();

      if (prevItem) {
        future.push(currentItem);
        nextState = {
          ...prevState,
          current: prevItem,
          past,
          future,
        };
      }
      break;
    }
    case 'redo': {
      const currentItem = prevState.current;
      let past = prevState.past.slice();
      let future = prevState.future.slice();
      let nextItem = future.pop();

      if (nextItem) {
        past.push(currentItem);
        nextState = {
          ...prevState,
          current: nextItem,
          past,
          future,
        };
      }
      break;
    }
    default: {
      break;
    }
  }
  return {
    ...nextState,
    past: nextState.past.slice(0, nextState.maxLength || 5),
    future: nextState.past.slice(0, nextState.maxLength || 5),
  };
}

export function useChangeHistoryState<T>(initialValue: T) {
  const [state, dispatch] = useReducer(historyStateReducer, {
    initialValue,
    current: { value: initialValue, timestamp: Date.now() },
    past: [],
    future: [],
    maxLength: 5,
  });

  const update = useCallback((updates: Partial<T>) => {
    dispatch({ type: 'update', updates });
  }, []);
  const undo = useCallback(() => {
    dispatch({ type: 'undo' });
  }, []);
  const redo = useCallback(() => {
    dispatch({ type: 'redo' });
  }, []);

  const reset = useCallback((newInitialValue?: T) => {
    dispatch({ type: 'reset', initialValue: newInitialValue });
  }, []);

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
}
