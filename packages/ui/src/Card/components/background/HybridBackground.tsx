import { Color } from '@mse/types';
import React from 'react';
import { SimpleBackground } from './SimpleBackground';
import './hybrid-mask.svg';
import './hybrid-mask-reverse.svg';

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
                  ? `url(/hybrid-mask.svg)`
                  : `url(/hybrid-mask-reverse.svg)`,
            }}
          />
        );
      })}
    </>
  );
};
