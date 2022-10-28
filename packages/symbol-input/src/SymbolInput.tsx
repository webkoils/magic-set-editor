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

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    console.log(document.elementFromPoint(event.clientX, event.clientY));
  }, []);
  const onMouseUp: React.MouseEventHandler = useCallback((event) => {
    let el = document.elementFromPoint(event.pageX, event.pageY);
    if (el) {
      let [line, column] = (el.getAttribute('data-index') || '').split('-');
      console.log(line, column);
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
    if (state.isFocused) {
      return state.tokensWithCursor.map((line, li) => {
        return line
          .map((t, i) => {
            switch (t.type) {
              case 'cursor': {
                return (
                  <span
                    {...{ ['data-index']: li + '-' + i }}
                    key={t.raw + '_' + i + '_' + li}
                    className={classes.cursor}
                  />
                );
              }

              case 'string': {
                return (
                  <span
                    {...{ ['data-index']: li + '-' + i }}
                    key={t.raw + '_' + i + '_' + li}
                    dangerouslySetInnerHTML={{ __html: t.Component }}
                  />
                );
              }
              case 'symbol': {
                return (
                  <t.Component
                    {...{ ['data-index']: li + '-' + i }}
                    key={t.raw + '_' + i + '_' + li}
                  >
                    {t.value}
                  </t.Component>
                );
              }
            }
          })
          .concat(
            li < state.tokensWithCursor.length - 1
              ? [<br key={'newLine' + li} />]
              : []
          );
      });
    } else {
      return state.tokens.map((line, li) => {
        let lineTokens: any[] = [];
        let textToken = '';
        line.forEach((t, i) => {
          switch (t.type) {
            case 'string': {
              textToken += t.Component;
              break;
            }
            case 'symbol': {
              textToken.length &&
                lineTokens.push(
                  <span
                    key={textToken + '_' + i + '_' + li}
                    dangerouslySetInnerHTML={{ __html: textToken }}
                  ></span>
                );
              textToken = '';
              lineTokens.push(
                <t.Component key={t.raw + '_' + i + '_' + li}>
                  {t.value}
                </t.Component>
              );
              break;
            }
          }
        });
        textToken.length &&
          lineTokens.push(
            <span key={textToken + '_' + 'last' + '_' + li}>{textToken}</span>
          );
        return lineTokens.concat(
          li < state.tokens.length - 1 ? [<br key={'newLine' + li} />] : []
        );
      });
    }
  }, [state?.tokensWithCursor, state?.tokens, state.isFocused]);

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
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      tabIndex={0}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {renderedTokens}
    </div>
  );
};
