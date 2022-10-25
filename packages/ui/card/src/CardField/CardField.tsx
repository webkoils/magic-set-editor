import { InputState, SymbolInput } from '@mse/symbol-input';
import { manaSymbolDelimeters, manaSymbolMapping } from '@mse/symbols';
import { MseCard } from '@mse/types';
import React, { useCallback, useMemo, useRef } from 'react';
import { useCardContext } from '../index';

export const CardField: React.FC<
  {
    id: 'name' | 'manaCost' | 'rulesText' | 'flavorText';
    multiline?: boolean;
  } & Omit<React.ComponentPropsWithoutRef<'div'>, 'id' | 'onChange'>
> = ({ id, multiline, ...props }) => {
  const { card, update } = useCardContext();
  const value = useMemo(() => card[id], [card, id]);
  const onChange = useCallback(
    (newValue: string) => {
      update({ [id]: newValue });
    },
    [update]
  );
  const options: Partial<InputState> = useMemo(
    () => ({
      symbols: [
        { code: 'CARDNAME', component: () => <>{card.name}</> },
        ...manaSymbolMapping,
      ],
      delimeters: manaSymbolDelimeters,
      maxLines: multiline ? 10 : 1,
    }),
    [multiline, card?.name]
  );
  return (
    <SymbolInput
      {...props}
      value={value}
      options={options}
      onChange={onChange}
    />
  );
};
