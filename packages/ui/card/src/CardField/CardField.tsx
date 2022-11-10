import {
  SymbolInput,
  SymbolInputToken,
  SymbolMapping,
} from '@mse/ui.symbol-input';
import React, { MutableRefObject, useCallback, useMemo } from 'react';
import { useCardContext } from '../CardProvider';
import { manaSymbolMapping, renderToken } from '@mse/utils/symbolRenderer';
import { MseCard } from '@mse/types';

export const CardField: React.FC<
  {
    id: keyof MseCard;
    multiline?: boolean;
    readonly?: boolean;
    inputRef?: MutableRefObject<HTMLDivElement | null>;
  } & Omit<
    React.ComponentPropsWithoutRef<'div'>,
    'id' | 'onChange' | 'readonly' | 'multiline'
  >
> = ({ id, multiline, readonly, inputRef, ...props }) => {
  const { card, editable, onChange } = useCardContext();

  const value = useMemo(() => (card[id] ? String(card[id]) : ''), [id, card]);
  const renderInputToken = useCallback(
    (token: SymbolInputToken) => {
      return renderToken(token, card);
    },
    [card]
  );

  const onFieldChange = useCallback(
    (newValue: string) => {
      return onChange({ [id]: newValue });
    },
    [id, value, onChange]
  );

  return (
    <SymbolInput
      {...props}
      innerRef={inputRef}
      value={value}
      symbols={manaSymbolMapping}
      renderToken={renderInputToken}
      onChange={onFieldChange}
      readonly={!editable || readonly}
      multiline={multiline}
    />
  );
};
