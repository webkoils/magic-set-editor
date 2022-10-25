import classNames from 'classnames';
import React, {
  FocusEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { cardTextInputClasses } from './cardTextInputStyles';
import { initTokens, inputStateReducer } from './cardTextInputState';

export const CardTextInput: React.FC<{
  initialValue?: string;
  symbolProps?: { shadow: boolean };
  className?: string;
  maxLines?: number;
  onChange?: (newValue: string) => void;
}> = ({ initialValue, symbolProps, className, maxLines, onChange }) => {
  const [state, dispatch] = useReducer(inputStateReducer, {
    symbols: [],
    symbolsWithCursor: [],
    cursorStart: 0,
    isFocused: false,
    numberOfLines: 1,
    maxLines: maxLines || 1,
    symbolProps,
    raw: '',
  });
  useEffect(() => {
    dispatch({
      eventType: 'reset',
      newState: {
        symbols: initTokens(initialValue || '', symbolProps),
        symbolsWithCursor: [],
        cursorStart: 0,
        isFocused: false,
        numberOfLines: 1,
        maxLines: maxLines || 1,
        symbolProps,
        raw: initialValue || '',
      },
    });
  }, [initialValue]);
  const isFocusedRef = useRef(false);

  const onFocus: FocusEventHandler = useCallback((ev) => {
    isFocusedRef.current = true;
    dispatch({ eventType: 'focus' });
    // setHtml([text]);
  }, []);

  const onBlur: FocusEventHandler = useCallback(
    (ev) => {
      isFocusedRef.current = false;

      // setHtml([<FormattedText text={text} />]);
      dispatch({ eventType: 'blur' });
      onChange && onChange(state.raw);
    },
    [onChange]
  );

  const onKeyPress = useCallback((e: KeyboardEvent) => {
    if (isFocusedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      // if (e.key === ' ') {
      dispatch({
        eventType: 'keypress',
        key: e.key,
        meta: e.metaKey,
        shift: e.shiftKey,
        control: e.altKey,
      });
      //  }
    }
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (isFocusedRef.current) {
      dispatch({
        eventType: 'keydown',
        key: e.key,
        meta: e.metaKey,
        shift: e.shiftKey,
        control: e.altKey,
      });

      e.stopImmediatePropagation();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, { capture: true });

    document.addEventListener('keypress', onKeyPress, { capture: true });
    return () => {
      document.removeEventListener('keydown', onKeyDown, { capture: true });

      document.removeEventListener('keypress', onKeyPress, { capture: true });
    };
  }, [onKeyPress, onKeyDown]);

  return (
    <div
      className={classNames(
        {
          focused: state.isFocused,
        },
        cardTextInputClasses.root,

        className
      )}
      tabIndex={-1}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {state.symbolsWithCursor.map((s) => s.Component)}
    </div>
  );
};
