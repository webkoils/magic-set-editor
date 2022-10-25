import classNames from 'classnames';
import React, {
  FocusEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import classes from './symbolInputStyles';
import { inputStateReducer, InputToken } from './symbolInputState';
import { initState, InputState } from './symbolInputState';

export const SymbolInput: React.FC<
  {
    value?: string;
    onChange?: (newValue: string) => void;
    options?: Partial<InputState>;
  } & Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'>
> = ({ value, className, options, onChange, ...others }) => {
  const initStateRef = useRef(
    initState({
      ...options,
      value: value || '',
    })
  );

  const [state, dispatch] = useReducer(inputStateReducer, initStateRef.current);
  useEffect(() => {
    initStateRef.current = initState({
      ...options,
      value: value || '',
    });
    dispatch({
      eventType: 'reset',
      newState: initStateRef.current,
    });
  }, [value]);
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
      onChange && onChange(state?.value);
    },
    [onChange, state?.value]
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

  const renderedTokens = useMemo(() => {
    return state.tokensWithCursor.map((line, li) => {
      return line
        .map((t, i) => {
          switch (t.type) {
            case 'cursor': {
              return (
                <span
                  key={t.raw + '_' + i + '_' + li}
                  className={classes.cursor}
                />
              );
            }

            case 'string': {
              return !state.isFocused && t.Component !== '&nbsp;' ? (
                t.Component
              ) : (
                <span
                  key={t.raw + '_' + i + '_' + li}
                  dangerouslySetInnerHTML={{ __html: t.Component }}
                />
              );
            }
            case 'symbol': {
              return (
                <t.Component key={t.raw + '_' + i + '_' + li}>
                  {t.value}
                </t.Component>
              );
            }
          }
        })
        .concat([<br key={'newLine' + li} />]);
    });
  }, [state?.tokensWithCursor, state.isFocused]);

  return (
    <div
      {...others}
      className={classNames(
        {
          focused: state.isFocused,
        },
        classes.root,

        className
      )}
      tabIndex={0}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {renderedTokens}
    </div>
  );
};
