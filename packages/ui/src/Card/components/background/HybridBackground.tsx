import { Color } from '@mse/types';
import React from 'react';
import { SimpleBackground } from './SimpleBackground';
export const HybridBackground: React.FC<{
  isLand: boolean;
  colors: Color[];
}> = ({ colors, isLand }) => {
  return (
    <>
      {colors.map((color, i) => {
        return (
          <SimpleBackground
            key={color}
            color={color}
            isLand={isLand}
            style={{
              maskSize: 'cover',
              maskMode: 'luminance',
              maskType: 'luminance',
              maskImage:
                i == 0
                  ? `url(m15/hybrid-mask.svg)`
                  : `url(m15/hybrid-mask-reverse.svg)`,
              WebkitMaskImage:
                i == 0
                  ? `url(m15/hybrid-mask.svg)`
                  : `url(m15/hybrid-mask-reverse.svg)`,
            }}
          />
        );
      })}
    </>
  );
};
