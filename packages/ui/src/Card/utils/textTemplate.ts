import { mtg } from '../../typings/mtg';

export const formatCardText = (text: string): mtg.CardSymbolGroup => {
  const symbolGroups: mtg.CardSymbolGroup = [];
  let currentText = text.concat('');
  while (currentText.length > 0) {
    let match = currentText.match(/\{\{(.+?)\}\}([^{]*)?/i);

    if (match !== null && typeof match.index !== 'undefined') {
      let nextIndexStart = match[0].length + match.index;
      let symbol = match[1] as mtg.CardTextSymbol['value'];
      let str: string | undefined = match[2];
      if (symbol) {
        symbolGroups.push({ type: 'symbol', value: symbol });
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
