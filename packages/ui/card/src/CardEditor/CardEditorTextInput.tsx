import { css, keyframes } from '@emotion/css';
import { manaSymbolMapping, staticSymbols } from '@mse/symbols';
import { parseCardToken } from '@mse/utils.card';
import classNames from 'classnames';
import React, {
  createElement,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  KeyboardEventHandler,
  ReactEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { diffChars } from 'diff';
import { useCardContext } from '../CardProvider/CardProvider';
import { renderToStaticMarkup } from 'react-dom/server';
const inputClass = css({
  outline: 0,
  background: 'transparent',
  fontFamily: 'inherit',
  position: 'relative',
  fontSize: 'inherit',
  color: 'inherit',
  overflow: 'visible',
  minHeight: '1.2em',
  minWidth: '1ch',
  backgroundColor: 'inherit',
  userSelect: 'none',
  //border: '1px  rgba(255,255,255,.7) inset',

  border: '1px inset transparent',
});
const inputClassFocused = css({
  border: '1px  rgba(0,0,0,.7) inset',
});
const blinkAnimation = keyframes`
  0%  {
    opacity:0;
  }
  50%  {
    opacity:1
  } 
  100%  {
    opacity:0
  }
`;

const cursorClass = css({
  opacity: 1,
  width: '0px',
  height: '.8em',
  display: 'inline-block',
  position: 'relative',
  overflow: 'visible',
  '&::after': {
    content: "''",
    visibility: 'visible',
    position: 'absolute',
    left: '-.5px',
    right: '-.5px',
    top: 0,
    bottom: 0,
    backgroundColor: 'white',

    animationName: blinkAnimation,
    animationDuration: '1s',
    animationDelay: '0s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'step-start',
  },
});

interface InputSymbol {
  Component: JSX.Element;
  key: string;
  raw: string;
  type: 'string' | 'symbol' | 'newline';
}
interface InputState {
  symbols: InputSymbol[];
  symbolsWithCursor: InputSymbol[];
  cursorStart: number;
  cursorEnd: number;
  isFocused: boolean;
  numberOfLines: number;
  maxLines: 1;
  symbolProps?: any;
}
type InputStateAction =
  | {
      eventType: 'keypress' | 'keydown';
      key: string;
    }
  | { eventType: 'focus' }
  | { eventType: 'blur' }
  | { eventType: 'reset' };

const getRaw = (symbols: InputSymbol[]) => {
  return symbols.flatMap(({ raw, type }) => [raw, type === 'symbol' ? '' : '']);
};

const getLastToken = (symbols: InputSymbol[]) => {
  let lastToken: string[] = [];
  let revSymbols = symbols.slice().reverse();
  for (let sym of revSymbols) {
    if (sym.type !== 'string') {
      return lastToken;
    }
    if (sym.raw === ' ') {
      if (lastToken.length) {
        return lastToken;
      }
    }
    lastToken.push(sym.raw);
  }
  return lastToken;
};

const inputStateReducer: React.Reducer<InputState, InputStateAction> = (
  prevState,
  action
) => {
  const newState = { ...prevState };

  if (action.eventType === 'reset') {
    return {
      symbols: [],
      symbolsWithCursor: [],
      cursorStart: 0,
      cursorEnd: 0,
      isFocused: false,
      raw: [],
      numberOfLines: 1,
      maxLines: 1,
    };
  }

  if (action.eventType === 'focus' || action.eventType === 'blur') {
    newState.isFocused = action.eventType === 'focus';
  } else {
    switch (action.key) {
      case 'Backspace':
      case 'Delete': {
        //delete

        newState.symbols = [
          ...newState.symbols.slice(0, newState.cursorStart - 1),
          ...newState.symbols.slice(newState.cursorEnd),
        ];

        newState.cursorStart = Math.max(
          0,
          Math.min(newState.cursorStart - 1, newState.symbols.length)
        );
        newState.cursorEnd = newState.cursorStart;
        break;
      }
      case 'ArrowRight': {
        newState.cursorStart = Math.max(
          0,
          Math.min(newState.cursorStart + 1, newState.symbols.length)
        );
        newState.cursorEnd = newState.cursorStart;
        break;
      }
      case 'ArrowLeft': {
        //move cursor
        newState.cursorStart = Math.max(
          0,
          Math.min(newState.cursorStart - 1, newState.symbols.length)
        );
        newState.cursorEnd = newState.cursorStart;
        break;
      }
      case ' ':
      case 'Enter': {
        if (action.eventType === 'keypress') {
          //check if previous symbols make a mana symbol

          let tokenChars = getLastToken(
            newState.symbols.slice(0, newState.cursorStart)
          );
          let token = tokenChars.reverse().join('');
          if (!token?.length) {
            if (action.key === ' ') {
              newState.symbols = [
                ...newState.symbols.slice(0, newState.cursorStart),
                {
                  raw: ' ',
                  key: Date.now() + 'space',
                  type: 'string',
                  Component: (
                    <span
                      key={Date.now()}
                      dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
                    ></span>
                  ),
                },
                ...newState.symbols.slice(newState.cursorStart),
              ];
              newState.cursorStart = Math.max(
                0,
                Math.min(newState.cursorStart + 1, newState.symbols.length)
              );
              newState.cursorEnd = newState.cursorStart;
            } else {
              if (newState.numberOfLines < newState.maxLines) {
                newState.symbols = [
                  ...newState.symbols.slice(0, newState.cursorStart),
                  {
                    raw: ' ',
                    key: Date.now() + 'newline',
                    type: 'newline',
                    Component: <br />,
                  },
                  ...newState.symbols.slice(newState.cursorStart),
                ];
                newState.cursorStart = Math.max(
                  0,
                  Math.min(newState.cursorStart + 1, newState.symbols.length)
                );
                newState.cursorEnd = newState.cursorStart;
              }
            }
          } else {
            const manaSymbol = parseCardToken(token, manaSymbolMapping);
            if (!manaSymbol) {
              let newSym =
                action.key === ' '
                  ? {
                      raw: ' ',
                      key: Date.now() + 'space',
                      type: 'string' as const,
                      Component: (
                        <span
                          key={Date.now()}
                          dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
                        ></span>
                      ),
                    }
                  : newState.numberOfLines < newState.maxLines
                  ? {
                      raw: ' ',
                      key: Date.now() + 'newline',
                      type: 'newline' as const,
                      Component: <br />,
                    }
                  : null;
              if (newSym) {
                newState.symbols = [
                  ...newState.symbols.slice(0, newState.cursorStart),
                  newSym,
                  ...newState.symbols.slice(newState.cursorStart),
                ];
                newState.cursorStart = Math.max(
                  0,
                  Math.min(newState.cursorStart + 1, newState.symbols.length)
                );
                newState.cursorEnd = newState.cursorStart;
              }
            } else {
              newState.symbols = [
                ...newState.symbols.slice(
                  0,
                  newState.cursorStart - token.length
                ),
                {
                  raw: token + '',
                  key: Date.now() + '',
                  type: 'symbol',

                  Component: (
                    <manaSymbol.component {...newState.symbolProps}>
                      {manaSymbol.passProps ? token : undefined}
                    </manaSymbol.component>
                  ),
                },
                ...newState.symbols.slice(newState.cursorStart),
              ];
            }
          }
        }
        break;
      }
      default: {
        if (action.eventType === 'keypress' && action.key.length === 1) {
          newState.symbols = [
            ...newState.symbols.slice(0, newState.cursorStart),
            {
              raw: action.key,
              key: Date.now() + action.key,
              type: 'string',

              Component: (
                <span
                  key={Date.now()}
                  dangerouslySetInnerHTML={{ __html: action.key }}
                ></span>
              ),
            },
            ...newState.symbols.slice(newState.cursorStart),
          ];
          newState.cursorStart = Math.max(
            0,
            Math.min(newState.cursorStart + 1, newState.symbols.length)
          );
          newState.cursorEnd = newState.cursorStart;
        }
        break;
      }
    }
  }
  if (newState.isFocused) {
    newState.symbolsWithCursor = [
      ...newState.symbols.slice(0, newState.cursorStart),
      {
        raw: '',
        key: 'cursor',
        type: 'string',

        Component: <span className={cursorClass} />,
      },
      ...newState.symbols.slice(newState.cursorEnd),
    ];
  } else {
    newState.symbolsWithCursor = newState.symbols;
  }
  newState.numberOfLines = Math.max(
    1,
    newState.symbols.filter(({ type }) => type === 'newline').length
  );
  return newState;
};

export const CardTextInput: React.FC<{
  initialValue?: string;
  shadow?: boolean;
}> = ({ initialValue, shadow }) => {
  const [state, dispatch] = useReducer(inputStateReducer, {
    symbols: [],
    symbolsWithCursor: [],
    cursorStart: 0,
    cursorEnd: 0,
    isFocused: false,
    numberOfLines: 1,
    maxLines: 1,
    symbolProps: { shadow },
  });

  const [text, setText] = useState(initialValue || '');
  const isFocusedRef = useRef(false);
  const inputRef = useRef<HTMLDivElement | null>(null);

  const [html, setHtml] = useState<React.ReactNode[]>([]);

  const onFocus: FocusEventHandler = useCallback((ev) => {
    isFocusedRef.current = true;
    dispatch({ eventType: 'focus' });
    // setHtml([text]);
  }, []);

  const onBlur: FocusEventHandler = useCallback((ev) => {
    isFocusedRef.current = false;

    // setHtml([<FormattedText text={text} />]);
    dispatch({ eventType: 'blur' });
  }, []);

  const onKeyPress = useCallback((e: KeyboardEvent) => {
    if (isFocusedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      // if (e.key === ' ') {
      dispatch({ eventType: 'keypress', key: e.key });
      //  }
    }
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (isFocusedRef.current) {
      dispatch({ eventType: 'keydown', key: e.key });

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
      className={classNames(inputClass, {
        [inputClassFocused]: state.isFocused,
      })}
      tabIndex={-1}
      ref={inputRef}
      onInput={console.log}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {state.symbolsWithCursor.map((s) => s.Component)}
    </div>
  );
};
