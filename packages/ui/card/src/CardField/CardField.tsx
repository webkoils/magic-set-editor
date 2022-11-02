import {
  SymbolInput,
  SymbolInputToken,
  SymbolMapping,
} from '@mse/symbol-input';
import { MtgSymbol } from '@mse/symbols';
import React, { useCallback, useMemo, useRef } from 'react';
import { useCardContext } from '../index';

const manaSymbolMapping: SymbolMapping = [
  {
    match: '(\\bCARDNAME\\b)',
    extract: '\\bCARDNAME\\b',
  },
  {
    match: '\\(([A-Z0-9/]+?)\\)',
    extract: '[A-Z0-9/]+?',
  },
];

export const CardField: React.FC<
  {
    id:
      | 'name'
      | 'manaCost'
      | 'rulesText'
      | 'flavorText'
      | 'power'
      | 'toughness'
      | 'supertype'
      | 'subtypes'
      | 'types';
    multiline?: boolean;
    readonly?: boolean;
  } & Omit<React.ComponentPropsWithoutRef<'div'>, 'id' | 'onChange'>
> = ({ id, multiline, readonly, ...props }) => {
  const { card, update } = useCardContext();
  const value = useMemo(() => (card[id] ? String(card[id]) : ''), [card, id]);
  const onChange = useCallback(
    (newValue: string) => {
      update({ [id]: newValue });
    },
    [update]
  );
  const renderToken = useCallback(
    (token: SymbolInputToken) => {
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
    },
    [card]
  );

  return (
    <SymbolInput
      {...props}
      value={value}
      symbols={manaSymbolMapping}
      renderToken={renderToken}
      onChange={onChange}
      readonly={readonly}
      multiline={multiline}
    />
  );
};
