import {
  parseTokens,
  SymbolInputToken,
  SymbolMapping,
} from '@mse/ui.symbol-input';
import { MtgSymbol } from '@mse/ui.symbols';
import { MseCard } from '@mse/types';

export const manaSymbolMapping: SymbolMapping = [
  {
    match: '(\\bCARDNAME\\b)',
    extract: '\\bCARDNAME\\b',
  },
  {
    match: '\\(([A-Z0-9/]+?)\\)',
    extract: '[A-Z0-9/]+?',
  },
];
export const renderToken = (token: SymbolInputToken, card: MseCard) => {
  switch (token.type) {
    case 'string': {
      return (
        <span
          key={token.key}
          dangerouslySetInnerHTML={{
            __html: token.raw,
          }}
        ></span>
      );
    }
    case 'symbol': {
      if (token.raw === 'CARDNAME') {
        return (
          <span
            key={token.key}
            dangerouslySetInnerHTML={{
              __html: card.name,
            }}
          ></span>
        );
      } else {
        return <MtgSymbol key={token.key}>{token.value || ''}</MtgSymbol>;
      }
    }
  }
};

export const parseText = (
  text: string,
  symbols: SymbolMapping,
  card: MseCard
): JSX.Element[][] => {
  return parseTokens(text, { symbols }).map((line, li) => {
    let lineTokens: any[] = [];
    let textToken = '';
    line.forEach((t, i) => {
      switch (t.type) {
        case 'string': {
          textToken += t.raw;
          break;
        }
        case 'symbol': {
          if (textToken.length) {
            lineTokens.push(
              renderToken(
                {
                  type: 'string',
                  raw: textToken,
                  key: textToken + '_' + i + '_' + li,
                },
                card
              )
            );
          }
          textToken = '';
          lineTokens.push(renderToken(t, card));

          break;
        }
      }
    });
    if (textToken.length) {
      lineTokens.push(
        renderToken(
          {
            type: 'string',
            raw: textToken,
            key: textToken + '_' + 'last' + '_' + li,
          },
          card
        )
      );
    }
    return lineTokens;
  });
};
