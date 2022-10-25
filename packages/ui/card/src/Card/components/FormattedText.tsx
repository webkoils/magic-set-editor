import { useMemo } from 'react';
import { useCardContext } from '../../CardProvider/CardProvider';
import { parseCardTokens, createSymbolMap } from '@mse/utils.card';

import { manaSymbolMapping } from '@mse/symbols';
export const FormattedText = ({
  size = 'small',
  text,
}: {
  size?: 'large' | 'small';
  text: string;
}) => {
  const { card } = useCardContext();
  const shadow = useMemo(() => size == 'large', [size]);
  const formattedText = useMemo(
    () => parseCardTokens(text, card, manaSymbolMapping),
    [text]
  );

  return (
    <>
      {formattedText.flat(1).map((symbol, i) => {
        if (symbol.type == 'text') {
          return symbol.value;
        } else if (!symbol.match) {
          return <symbol.value shadow={shadow} />;
        } else {
          return <symbol.value shadow={shadow}>{symbol.match}</symbol.value>;
        }
      })}
    </>
  );
};
