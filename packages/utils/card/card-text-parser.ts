import * as mtg from '@mse/types';
import { isPropertyOfType } from '@mse/types';

export const parseCardText = (
  text: string,
  card: mtg.Card,
  symbols: Record<string, string>,
  maxDepth: number = 3
): mtg.CardSymbolGroup => {
  if (maxDepth === 0) {
    return [];
  }
  const symbolGroups: mtg.CardSymbolGroup = [];
  let currentText = text.concat('');
  while (currentText.length > 0) {
    let match = currentText.match(/\{\{(.+?)\}\}([^{]*)?/i);

    if (match !== null && typeof match.index !== 'undefined') {
      if (match.index > 0) {
        symbolGroups.push({
          type: 'text',
          value: currentText.slice(0, match.index),
        });
      }
      let nextIndexStart = match[0].length + match.index;
      const tokens = (match[1] || '').split(' ');

      const str: string | undefined = match[2];
      if (tokens.length) {
        let groupsToPush = tokens.flatMap((symbol) => {
          const [parent, key] = symbol.split('.');
          console.log({ parent, key });
          switch (parent) {
            case 'symbols': {
              if (isPropertyOfType(symbols, key)) {
                return [
                  {
                    type: 'symbol' as const,
                    value: symbols[key],
                  },
                ];
              }
              break;
            }
            case 'card': {
              if (isPropertyOfType(card, key)) {
                return parseCardText(
                  String(card[key]),
                  card,
                  symbols,
                  maxDepth - 1
                );
              }
              break;
            }
          }
          return [
            {
              type: 'text' as const,
              value: symbol,
            },
          ];
        });
        symbolGroups.push(...groupsToPush);
      }
      if (str) {
        symbolGroups.push({ type: 'text', value: str });
      }
      currentText = currentText.slice(nextIndexStart);
      //console.log(match.index, nextIndexStart, currentText);
    } else {
      symbolGroups.push({ type: 'text', value: currentText });
      currentText = '';
    }
  }
  return symbolGroups;
};
