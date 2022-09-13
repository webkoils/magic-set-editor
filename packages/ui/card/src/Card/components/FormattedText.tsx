import {
  MAGIC_MANA_LARGE_SYMBOL_FONT_ASSETS,
  MAGIC_MANA_SMALL_SYMBOL_FONT_ASSETS,
} from '@mse/assets';
import { useEffect, useMemo } from 'react';
import { useCardContext } from '../../CardProvider/CardProvider';
import { parseCardText } from '@mse/utils.card';

export const FormattedText = ({
  size = 'small',
  text,
}: {
  size?: 'large' | 'small';
  text: string;
}) => {
  const card = useCardContext();
  const fontForSize = useMemo(
    () =>
      size == 'large'
        ? MAGIC_MANA_LARGE_SYMBOL_FONT_ASSETS
        : MAGIC_MANA_SMALL_SYMBOL_FONT_ASSETS,
    [size]
  );
  const formattedText = useMemo(() => parseCardText(text, card, fontForSize), [
    text,
  ]);

  return (
    <>
      {formattedText.map((symbol, i) => {
        if (symbol.type == 'text') {
          return symbol.value;
        } else {
          return (
            <img
              key={symbol.type + i}
              style={{ display: 'inline-block', height: '1em', width: '1em' }}
              src={symbol.value}
            />
          );
        }
      })}
    </>
  );
};
