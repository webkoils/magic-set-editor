import { MAGIC_MANA_SMALL_SYMBOL_FONT_ASSETS } from '@mse/assets/dist';
import { useEffect, useMemo } from 'react';
import { formatCardText } from '../utils/textTemplate';
const fontForSize = /* size == 'large'
      ? templateMAGIC_MANA_LARGE_SYMBOL_FONT
      :*/ MAGIC_MANA_SMALL_SYMBOL_FONT_ASSETS;

export const CardFormattedText = ({
  size = 'small',
  text,
}: {
  size?: 'large' | 'small';
  text: string;
}) => {
  const formattedText = useMemo(() => formatCardText(text), [text]);
  useEffect(() => {
    console.log(formattedText);
    formattedText.forEach((symbol, i) => {
      if (symbol.type !== 'string') {
        console.log(fontForSize[symbol.value]);
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
