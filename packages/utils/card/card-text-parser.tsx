import * as mse from '@mse/types';
import { isPropertyOfType } from '@mse/types';

export const parseCardToken = (
  text: string,
  symbols: mse.ManaSymbolMapping
) => {
  const regexes = Object.entries(symbols).filter(([k, v]) => {
    return !!v.regex;
  });
  if (isPropertyOfType(symbols, text)) {
    return symbols[text];
  }
  let symMatch = regexes.find(([code, value]) => {
    return !!text.match(new RegExp('^' + code + '$'));
  });
  if (symMatch) {
    return symMatch[1];
  }
  return null;
};

export const parseCardTokens = (
  text: string,
  card: mse.MseCard,
  symbols: mse.ManaSymbolMapping,
  maxDepth: number = 3
): mse.MseCardSymbolGroup[] => {
  if (maxDepth === 0) {
    return [];
  }

  const manaSymbolRegex = new RegExp(
    '^(' + Object.keys(symbols).join('|') + '|card..+?)$'
  );
  const regexes = Object.entries(symbols).filter(([k, v]) => {
    return !!v.regex;
  });
  let lines = text.split('\n');
  return lines.map((line, l) => {
    let tokens = line.split(/ /);
    return tokens.flatMap((t, i) => {
      let match = t.match(manaSymbolRegex);
      if (match === null) {
        return [{ type: 'text', value: t + '' }];
      }
      if (t.indexOf('card.') == 0) {
        let p = t.split('.')[1];
        if (p && isPropertyOfType(card, p)) {
          return parseCardTokens(
            String(card[p]),
            card,
            symbols,
            maxDepth - 1
          ).flat(1);
        }
      }
      if (isPropertyOfType(symbols, t)) {
        return [
          {
            type: 'symbol' as const,
            value: symbols[t].component,
          },
        ];
      } else {
        let symMatch = regexes.find(([code, value]) => {
          if (value.regex) {
            return !!t.match(new RegExp(code));
          }
          return false;
        });
        if (symMatch) {
          return [
            {
              type: 'symbol' as const,
              value: symMatch[1].component,
              match: t,
            },
          ];
        }
      }
      return [{ type: 'text', value: t }];
    });
  });
};
