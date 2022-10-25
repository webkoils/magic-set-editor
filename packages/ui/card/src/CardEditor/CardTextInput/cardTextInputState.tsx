import { manaSymbolMapping } from '@mse/symbols';
import { parseCardToken } from '@mse/utils.card';
import React from 'react';
import { cardTextInputClasses } from './cardTextInputStyles';
export interface InputSymbol {
  Component: JSX.Element;
  key: string;
  raw: string;
  type: 'string' | 'symbol' | 'newline';
}
export interface InputState {
  symbols: InputSymbol[];
  symbolsWithCursor: InputSymbol[];
  cursorStart: number;
  isFocused: boolean;
  numberOfLines: number;
  maxLines: number;
  symbolProps?: any;
  raw: string;
}
export type InputStateAction =
  | {
      eventType: 'keypress' | 'keydown';
      key: string;
      meta?: boolean;
      shift?: boolean;
      control?: boolean;
    }
  | { eventType: 'focus' }
  | { eventType: 'blur' }
  | { eventType: 'reset'; newState: InputState };

export const initTokens = (text: string, symbolProps: any): InputSymbol[] => {
  const manaSymbolRegex = new RegExp(
    '\\((' + Object.keys(manaSymbolMapping).join('|') + ')\\)'
  );
  console.log(manaSymbolRegex);
  let tokens = text.split(manaSymbolRegex);
  if (tokens.length === 1) {
    return text.split('').map((t, i) => ({
      raw: t,
      key: Date.now() + '' + t + '_' + i,
      type: 'string' as const,
      Component: (
        <span
          key={Date.now() + '' + t + '_' + i}
          dangerouslySetInnerHTML={{ __html: t }}
        ></span>
      ),
    }));
  } else {
    return tokens
      .filter((t) => t?.length > 0)
      .flatMap((t) => {
        let manaSymbol = parseCardToken(t, manaSymbolMapping);
        if (!manaSymbol) {
          return t.split('').map(
            (t, i) =>
              ({
                raw: t,
                key: Date.now() + '' + t + '_' + i,
                type: 'string',
                Component: (
                  <span
                    key={Date.now() + '' + t + '_' + i}
                    dangerouslySetInnerHTML={{ __html: t }}
                  ></span>
                ),
              } as InputSymbol)
          );
        } else {
          return [
            {
              raw: '(' + t + ')',
              key: Date.now() + '(' + t + ')',
              type: 'symbol',

              Component: (
                <manaSymbol.component {...symbolProps}>
                  {manaSymbol.passProps ? t : undefined}
                </manaSymbol.component>
              ),
            },
          ];
        }
      });
  }
};

export const getRaw = (symbols: InputSymbol[]) => {
  return symbols.flatMap(({ raw, type }) => [raw, type === 'symbol' ? '' : '']);
};

export const getLastToken = (symbols: InputSymbol[]) => {
  let lastToken: string[] = [];
  let revSymbols = symbols.slice().reverse();
  for (let sym of revSymbols) {
    if (sym.type !== 'string') {
      return lastToken;
    }
    if (sym.raw === ' ' || sym.raw === '(') {
      if (lastToken.length) {
        return lastToken;
      }
    }
    lastToken.push(sym.raw);
  }
  return lastToken;
};

export const inputStateReducer: React.Reducer<InputState, InputStateAction> = (
  prevState,
  action
) => {
  console.log(action.eventType);
  if (action.eventType === 'reset') {
    const newState = action.newState;
    return {
      ...newState,
      symbolsWithCursor: [
        ...newState.symbols,
        {
          raw: '',
          key: 'cursor',
          type: 'string',

          Component: <span className={cardTextInputClasses.cursor} />,
        },
      ],
      cursorStart: newState.symbols.length,
    };
  }
  const newState = { ...prevState };

  if (action.eventType === 'focus' || action.eventType === 'blur') {
    newState.isFocused = action.eventType === 'focus';
    return newState;
  } else {
    console.log(action.key);
    switch (action.key) {
      case 'Backspace':
      case 'Delete': {
        //delete

        newState.symbols = [
          ...newState.symbols.slice(0, newState.cursorStart - 1),
          ...newState.symbols.slice(newState.cursorStart),
        ];

        newState.cursorStart = Math.max(
          0,
          Math.min(newState.cursorStart - 1, newState.symbols.length)
        );
        break;
      }
      case 'ArrowRight': {
        console.log(newState.cursorStart);
        newState.cursorStart = Math.max(
          0,
          Math.min(newState.cursorStart + 1, newState.symbols.length)
        );
        console.log(newState.cursorStart);

        break;
      }
      case 'ArrowLeft': {
        //move cursor
        console.log(newState.cursorStart);

        newState.cursorStart = Math.max(
          0,
          Math.min(newState.cursorStart - 1, newState.symbols.length)
        );
        console.log(newState.cursorStart);

        break;
      }
      case ')':
      case ':': {
        if (action.eventType == 'keypress') {
          let tokenChars = getLastToken(
            newState.symbols.slice(0, newState.cursorStart)
          );
          let token = tokenChars.reverse().join('');
          let manaSymbol =
            token.length && parseCardToken(token, manaSymbolMapping);
          if (!token?.length || !manaSymbol) {
            newState.symbols = [
              ...newState.symbols.slice(0, newState.cursorStart),
              {
                raw: action.key,
                key: Date.now() + action.key,
                type: 'string',
                Component: (
                  <span
                    key={Date.now() + action.key}
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
          } else {
            newState.symbols = [
              ...newState.symbols.slice(
                0,
                newState.cursorStart - token.length - 1
              ),
              ...[
                {
                  raw: '(' + token + ')',
                  key: Date.now() + '(' + token + ')',
                  type: 'symbol',

                  Component: (
                    <manaSymbol.component
                      key={Date.now() + '(' + token + ')'}
                      {...newState.symbolProps}
                    >
                      {manaSymbol.passProps ? token : undefined}
                    </manaSymbol.component>
                  ),
                } as InputSymbol,
              ],
              ...(action.key === ':'
                ? [
                    {
                      raw: action.key,
                      key: Date.now() + action.key,
                      type: 'string',
                      Component: (
                        <span
                          key={Date.now() + action.key}
                          dangerouslySetInnerHTML={{ __html: action.key }}
                        ></span>
                      ),
                    } as InputSymbol,
                  ]
                : []),
              ...newState.symbols.slice(newState.cursorStart),
            ];
            newState.cursorStart = Math.max(
              0,
              Math.min(
                newState.cursorStart + (action.key === ':' ? 1 : 0),
                newState.symbols.length
              )
            );
          }
        }
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
          const manaSymbol =
            token.length && parseCardToken(token, manaSymbolMapping);

          if (!token?.length || !manaSymbol) {
            if (action.key === ' ') {
              newState.symbols = [
                ...newState.symbols.slice(0, newState.cursorStart),
                {
                  raw: ' ',
                  key: Date.now() + 'space',
                  type: 'string',
                  Component: (
                    <span
                      key={Date.now() + 'space'}
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
            } else {
              console.log(newState.numberOfLines, newState.maxLines);
              if (newState.numberOfLines < newState.maxLines) {
                newState.symbols = [
                  ...newState.symbols.slice(0, newState.cursorStart),
                  {
                    raw: ' ',
                    key: Date.now() + 'newline',
                    type: 'newline',
                    Component: <br key={Date.now() + 'newline'} />,
                  },
                  ...newState.symbols.slice(newState.cursorStart),
                ];
                newState.cursorStart = Math.max(
                  0,
                  Math.min(newState.cursorStart + 1, newState.symbols.length)
                );
              }
            }
          } else {
            newState.symbols = [
              ...newState.symbols.slice(0, newState.cursorStart - token.length),
              {
                raw: '(' + token + ')',
                key: Date.now() + '(' + token + ')',
                type: 'symbol',

                Component: (
                  <manaSymbol.component
                    key={Date.now() + '(' + token + ')'}
                    {...newState.symbolProps}
                  >
                    {manaSymbol.passProps ? token : undefined}
                  </manaSymbol.component>
                ),
              },
              ...newState.symbols.slice(newState.cursorStart),
            ];
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
                  key={Date.now() + 'action.key'}
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
        }
        break;
      }
    }
  }

  newState.symbolsWithCursor = [
    ...newState.symbols.slice(0, newState.cursorStart),
    {
      raw: '',
      key: 'cursor',
      type: 'string',

      Component: (
        <span key={'cursor'} className={cardTextInputClasses.cursor} />
      ),
    },
    ...newState.symbols.slice(newState.cursorStart),
  ];
  console.log(newState);
  newState.numberOfLines = Math.max(
    1,
    newState.symbols.filter(({ type }) => type === 'newline').length
  );
  newState.raw = getRaw(newState.symbols).join('');
  return newState;
};
