import { SymbolInput, SymbolInputToken } from '@mse/symbol-input';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { manaSymbolMapping, renderToken } from '@mse/utils.symbol-renderer';
import { MseCard } from '@mse/types';

export const CardField: React.FC<
  {
    card?: MseCard;
    id: keyof MseCard;
    multiline?: boolean;
    readonly?: boolean;
    onChange?: (changes: Partial<MseCard>) => void;
    inputRef?: MutableRefObject<HTMLDivElement | null>;
  } & Omit<
    React.ComponentPropsWithoutRef<'div'>,
    'id' | 'onChange' | 'readonly' | 'multiline'
  >
> = ({ id, multiline, readonly, inputRef, onChange, card, ...props }) => {
  const value = useMemo(
    () => (!card ? '' : card[id] ? String(card[id]) : ''),
    [id, card]
  );
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const renderInputToken = useCallback(
    (token: SymbolInputToken) => {
      return renderToken(token, card);
    },
    [card]
  );

  const onFieldChange = useCallback(
    (newValue: string) => {
      if (onChange) {
        return onChange({ [id]: newValue });
      }
    },
    [onChange, id]
  );

  return (
    <SymbolInput
      {...props}
      innerRef={inputRef}
      value={localValue}
      symbols={manaSymbolMapping}
      renderToken={renderInputToken}
      onChange={onFieldChange}
      readonly={readonly}
      multiline={multiline}
    />
  );
};
