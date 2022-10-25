import React from 'react';
export type InputToken =
  | {
      Component: React.ComponentType<any>;
      raw: string;
      type: 'symbol';
      value?: string | number;
    }
  | {
      Component: string;
      raw: string;
      type: 'string';
    }
  | {
      raw: string;
      type: 'cursor';
    };
export type SymbolMapping = {
  component: React.ComponentType<Record<string, any>>;
  code: string;
}[];
export type SymbolMatch = {
  component: React.ComponentType<Record<string, any>>;
  code: string;
  match: RegExpMatchArray;
};

export type SymbolDelimeters = {
  code: string;

  start?: boolean;
  end?: boolean;
}[];
export interface InputState {
  tokens: InputToken[][];
  tokensWithCursor: InputToken[][];
  symbols: SymbolMapping;
  symbolRegex: RegExp;
  delimeters: SymbolDelimeters;
  cursor: [number, number];
  isFocused: boolean;
  numberOfLines: number;
  maxLines: number;
  value: string;
}
export type InputStateInit = Partial<InputState> & { value: string };

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

const clamp = (val: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, val));
};
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const createSymbolRegex = (codes: string[], delimeters: SymbolDelimeters) => {
  if (codes.length === 0) {
    return new RegExp('');
  }
  let regex = ``;
  let startDelimeters = delimeters.filter((val) => val.start);
  let endDelimeters = delimeters.filter((val) => val.end);
  if (startDelimeters.length) {
    regex += `(?:${startDelimeters
      .map(({ code }) => escapeRegExp(code))
      .join('|')})`;
  }
  regex += `(${codes.join('|')})`;
  if (endDelimeters.length) {
    regex += `(?:${endDelimeters
      .map(({ code }) => escapeRegExp(code))
      .join('|')})`;
  }
  if (delimeters.length === 0) {
    return new RegExp('^' + regex + '$');
  }
  return new RegExp(regex);
};

export const matchSymbol = (
  text: string,
  mapping: SymbolMapping
): SymbolMatch | null => {
  for (let i = 0; i < mapping.length; i++) {
    // console.log(createSymbolRegex([mapping[i].code], []), text);
    let found = text.match(createSymbolRegex([mapping[i].code], []));
    if (!!found) {
      return { ...mapping[i], match: found };
    }
  }
  return null;
};

export const parseTokens = (state: InputState) => {
  let lines = state.value.split('\n');
  return lines.map((l, li) => {
    let line = l.slice();
    let tokens: InputToken[] = [];
    let match = line.match(state.symbolRegex);

    while (line.length > 0 && match) {
      console.log(li, line);

      let symbolText = match[1];

      let prevText = line.slice(0, match.index);
      if (prevText.length) {
        tokens.push(
          ...prevText.split('').map(
            (st, si) =>
              ({
                raw: st,
                key: li + '_' + st + '_' + si,
                type: 'string',
                Component:
                  st === ' ' && si > 0 && line[si - 1] === ' ' ? '&nbsp;' : st,
              } as InputToken)
          )
        );
      }

      let symbol = matchSymbol(symbolText, state.symbols);
      if (symbol?.match) {
        tokens.push({
          raw: match[0],
          value: match[1],
          key: li + '_' + symbol.match.index + symbolText,
          type: 'symbol',

          Component: symbol.component,
        } as InputToken);
      }
      line = line.slice((match.index || 0) + match[0].length);
      match = line.match(state.symbolRegex);
    }
    if (line.length) {
      tokens.push(
        ...line.split('').map(
          (st, si) =>
            ({
              raw: st,
              key: li + '_' + st + '_' + si,
              type: 'string',
              Component:
                st === ' ' && si > 0 && line[si - 1] === ' ' ? '&nbsp;' : st,
            } as InputToken)
        )
      );
    }
    return tokens;
  });
};
export const initState = (initState: InputStateInit) => {
  const newState: InputState = {
    symbols: [],
    delimeters: [],
    tokens: [],
    tokensWithCursor: [],

    cursor: [0, 0],
    isFocused: false,
    numberOfLines: 1,
    maxLines: 1,

    symbolRegex: createSymbolRegex(
      initState.symbols?.map(({ code }) => code) || [],
      initState.delimeters || []
    ),
    ...initState,
  };

  newState.tokens = parseTokens(newState);
  return newState;
};

export const getRaw = (tokens: InputToken[][]) => {
  return tokens.map((t) => t.map(({ raw, type }) => raw).join('')).join('\n');
};

const moveCursor = (
  state: InputState,
  dy: number,
  dx: number
): [number, number] => {
  console.log('moveCursor', state.tokens, state.cursor, dy, dx);
  if (dy === 0) {
    if (state.cursor[1] + dx < 0) {
      if (state.cursor[0] > 0) {
        console.log(state.tokens.length);
        let y = clamp(state.cursor[0] - 1, 0, state.tokens.length - 1);
        console.log(y);
        let x = clamp(state.tokens[y].length, 0, state.tokens[y].length - 1);
        return [y, x];
      }
    } else if (state.cursor[1] + dx > state.tokens[state.cursor[0]].length) {
      if (state.cursor[0] < state.tokens.length - 1) {
        let y = clamp(state.cursor[0] + 1, 0, state.tokens.length - 1);
        let x = 0;
        return [y, x];
      }
    }
  }
  let newRow = clamp(state.cursor[0] + dy, 0, state.tokens.length - 1);
  let newCol = clamp(state.cursor[1] + dx, 0, state.tokens[newRow].length);

  return [newRow, newCol];
};

export const inputStateReducer: React.Reducer<InputState, InputStateAction> = (
  prevState,
  action
) => {
  let newState = { ...prevState };
  // console.log(prevState.tokens);
  if (action.eventType === 'reset') {
    newState = action.newState;
    newState.cursor = moveCursor(newState, 10000, 10000);
  } else if (action.eventType === 'focus' || action.eventType === 'blur') {
    newState.isFocused = action.eventType === 'focus';
  } else if (action.eventType == 'keypress') {
    if (action.key === 'Enter') {
      newState.tokens.push([]);
      newState.value = getRaw(newState.tokens);

      newState.cursor = moveCursor(newState, 1, 0);
    } else {
      let prevToken = newState.tokens[newState.cursor[0]][newState.cursor[1]];
      newState.tokens[newState.cursor[0]] = [
        ...newState.tokens[newState.cursor[0]].slice(0, newState.cursor[1]),
        {
          type: 'string',
          raw: action.key,
          Component:
            action.key === ' ' && prevToken?.raw === ' '
              ? '&nbsp;'
              : action.key,
        },
        ...newState.tokens[newState.cursor[0]].slice(newState.cursor[1]),
      ];
      newState.cursor = moveCursor(newState, 0, 1);

      newState.value = getRaw(newState.tokens);
    }
  } else {
    switch (action.key) {
      case 'Backspace':
      case 'Delete': {
        //delete
        if (newState.cursor[1] === 0 && newState.cursor[0] > 0) {
          ///delete new line
          // console.log('delete new line', newState.tokens, newState.cursor);

          let [line] = newState.tokens.splice(newState.cursor[0], 1);
          newState.tokens[newState.cursor[0] - 1] = newState.tokens[
            newState.cursor[0] - 1
          ].concat(line);
          newState.cursor = moveCursor(newState, -1, 1000);
        } else {
          newState.tokens[newState.cursor[0]] = [
            ...newState.tokens[newState.cursor[0]].slice(
              0,
              newState.cursor[1] - 1
            ),
            ...newState.tokens[newState.cursor[0]].slice(newState.cursor[1]),
          ];
          // console.log('regular ass delete', newState.cursor);

          newState.cursor = moveCursor(newState, 0, -1);
        }
        newState.value = getRaw(newState.tokens);

        break;
      }
      case 'ArrowRight': {
        newState.cursor = moveCursor(newState, 0, 1);

        break;
      }
      case 'ArrowLeft': {
        //move cursor
        newState.cursor = moveCursor(newState, 0, -1);

        break;
      }
      case 'ArrowUp': {
        newState.cursor = moveCursor(newState, -1, 0);

        break;
      }
      case 'ArrowDown': {
        newState.cursor = moveCursor(newState, 1, 0);

        break;
      }
    }
  }
  newState.tokens = parseTokens(newState);
  //newState.value = getRaw(newState.tokens);

  newState.tokensWithCursor = newState.tokens.map((t, i) => {
    if (i === newState.cursor[0]) {
      return [
        ...t.slice(0, newState.cursor[1]),
        {
          raw: '',
          type: 'cursor',
        },
        ...t.slice(newState.cursor[1]),
      ];
    } else {
      return t;
    }
  });
  newState.cursor = moveCursor(newState, 0, 0);

  newState.numberOfLines = newState.tokens.length;
  return newState;
};
