import {
  MAGIC_MANA_LARGE_SYMBOL_FONT_ASSETS,
  MAGIC_MANA_SMALL_SYMBOL_FONT_ASSETS,
} from '@mse/assets';
import { useEffect, useMemo } from 'react';
import { formatCardText } from '../utils/textTemplate';

export const FormattedText = ({
  size = 'small',
  text,
}: {
  size?: 'large' | 'small';
  text: string;
}) => {
  const formattedText = useMemo(() => formatCardText(text), [text]);
  const fontForSize = useMemo(
    () =>
      size == 'large'
        ? MAGIC_MANA_LARGE_SYMBOL_FONT_ASSETS
        : MAGIC_MANA_SMALL_SYMBOL_FONT_ASSETS,
    [size]
  );

  useEffect(() => {
    formattedText.forEach((symbol, i) => {
      if (symbol.type !== 'string') {
        //  console.log(fontForSize[symbol.value]);
      }
    });
  }, [formattedText]);
  return (
    <>
      {formattedText.map((symbol, i) => {
        if (symbol.type == 'string') {
          return <span key={symbol.type + i}>{symbol.value}</span>;
        } else {
          return (
            <img
              key={symbol.type + i}
              style={{ display: 'inline-block', height: '1em', width: '1em' }}
              src={fontForSize[symbol.value]}
            />
          );
        }
      })}
    </>
  );
};
