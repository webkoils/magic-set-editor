import * as mtg from '@mse/types';

export const formatCardText = (text: string): mtg.CardSymbolGroup => {
  const symbolGroups: mtg.CardSymbolGroup = [];
  let currentText = text.concat('');
  while (currentText.length > 0) {
    let match = currentText.match(/\{\{(.+?)\}\}([^{]*)?/i);

    if (match !== null && typeof match.index !== 'undefined') {
      let nextIndexStart = match[0].length + match.index;
      let symbols = (match[1] || '').split(' ');

      let str: string | undefined = match[2];
      if (symbols.length) {
        let groupsToPush = symbols.map((symbol) => ({
          type: 'symbol' as const,
          value: symbol as mtg.CardTextSymbol['value'],
        }));
        symbolGroups.push(...groupsToPush);
      }
      if (str) {
        symbolGroups.push({ type: 'string', value: str });
      }
      currentText = currentText.slice(nextIndexStart);
      console.log(match.index, nextIndexStart, currentText);
    } else {
      symbolGroups.push({ type: 'string', value: currentText });
      currentText = '';
    }
  }
  return symbolGroups;
};
