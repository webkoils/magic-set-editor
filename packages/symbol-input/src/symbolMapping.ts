export type SymbolInputToken = {
  key: string;
  raw: string;
  type: 'symbol' | 'string' | 'cursor';
  value?: string | number;
};

export type SymbolMapping = {
  match: string;
  extract: string;
}[];

export type SymbolParserConfig = {
  symbols: SymbolMapping;
};

const createSymbolRegex = (mapping: SymbolMapping) => {
  if (mapping.length === 0) {
    return /^$/;
  }

  const regex = mapping.map(({ match }) => match).join('|');
  return new RegExp('(' + regex + ')');
};

export const matchSymbol = (
  match: RegExpMatchArray,
  mapping: SymbolMapping
) => {
  const shiftedArray = match.slice(2);
  const found = shiftedArray.findIndex((v) => !!v);

  if (found >= 0) {
    return {
      ...mapping[found],
      index: match.index || 0,
      raw: match[0],
      value: shiftedArray[found],
    };
  }

  return null;
};

export const parseTokens = (
  text: string,
  config: SymbolParserConfig
): SymbolInputToken[][] => {
  const lines = text.replace(/<div>(.+?)<\/div>/gi, '$1').split(/<br ?\/?>|\n/);
  const symbolFinderRegex = createSymbolRegex(config.symbols);
  return lines.map((l, li) => {
    let line = l.slice();
    const tokens: SymbolInputToken[] = [];
    let match = line.match(symbolFinderRegex);
    let i = 0;
    while (line.length > 0 && match) {
      const symbol = matchSymbol(match, config.symbols);
      const prevText = line.slice(0, match.index);
      if (prevText.length) {
        tokens.push({
          raw: prevText,
          key: li + '_' + prevText + '_' + i,
          type: 'string',
        } as SymbolInputToken);
      }
      if (symbol) {
        tokens.push({
          raw: symbol.raw,
          value: symbol.value,
          key: li + '_' + i + symbol.raw,
          type: 'symbol',
        } as SymbolInputToken);
      }
      line = line.slice((match.index || 0) + match[0].length);
      match = line.match(symbolFinderRegex);
      i++;
    }
    if (line.length) {
      tokens.push({
        raw: line,
        key: li + '_' + line + '_' + 'end',
        type: 'string',
      } as SymbolInputToken);
    }
    return tokens;
  });
};

export const decodeEntities = (str: string) => {
  if (str && typeof str === 'string') {
    // strip script/html tags
    let transformed = str.replace(/<br ?\/?>/gi, 'LINEBREAK');
    transformed = transformed
      .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
      .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>?/gim, '')
      .replace(/LINEBREAK/g, '<br />');

    return transformed;
  }

  return str;
};
