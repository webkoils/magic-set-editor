import { MtgSymbol } from '@mse/symbols';
import type { SymbolDelimeters, SymbolMapping } from '@mse/symbol-input';
const manaSymbolMapping: SymbolMapping = [
  { code: '[A-Z0-9/]+?', component: MtgSymbol },
];
const manaSymbolDelimeters: SymbolDelimeters = [
  { code: '(', start: true },
  { code: ')', end: true },
];

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

export const matchSymbol = (text: string, mapping: SymbolMapping) => {
  console.log(text);
  for (let i = 0; i < mapping.length; i++) {
    console.log(createSymbolRegex([mapping[i].code], []), text);
    let found = text.match(createSymbolRegex([mapping[i].code], []));
    if (!!found) {
      return { ...mapping[i], match: found };
    }
  }
  return null;
};

export const parseTokens = (text: string) => {
  let lines = text.replace(/<div>(.+?)<\/div>/gi, '$1').split(/<br\/?>|\n/);
  return lines.map((l, li) => {
    let line = l.slice();
    let tokens = [];
    let match = line.match(/\(([A-Z0-9/]+?)\)/);

    while (line.length > 0 && match) {
      console.log(/\(([A-Z0-9/]+?)\)/, match, li, line);

      let symbolText = match[1];

      let prevText = line.slice(0, match.index);
      if (prevText.length) {
        tokens.push(
          ...prevText.split('').map((st, si) => ({
            raw: st,
            key: li + '_' + st + '_' + si,
            type: 'string',
            Component: st,
          }))
        );
      }
      if (symbolText) {
        let symbol = matchSymbol(symbolText, manaSymbolMapping);
        if (symbol?.match) {
          tokens.push({
            raw: match[0],
            value: match[1],
            key: li + '_' + symbol.match.index + symbolText,
            type: 'symbol',

            Component: symbol.component,
          });
        }
      }
      line = line.slice((match.index || 0) + match[0].length);
      match = line.match(/\(([A-Z0-9/]+?)\)/);
    }
    if (line.length) {
      tokens.push(
        ...line.split('').map((st, si) => ({
          raw: st,
          key: li + '_' + st + '_' + si,
          type: 'string',
          Component: st,
        }))
      );
    }
    return tokens;
  });
};

export { manaSymbolMapping, manaSymbolDelimeters };
