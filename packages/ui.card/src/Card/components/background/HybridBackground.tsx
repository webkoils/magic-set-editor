import { MseColor } from '@mse/types';
import React, { memo } from 'react';
import SimpleBackground from './SimpleBackground';
const gradient = `rgba(255,255,255,0) 0% ,rgba(255,255,255,0) 40%, rgba(255,255,255,1) 50%,rgba(255,255,255,1) 100% `;
const HybridBackground: React.FC<{
  isLand: boolean;
  colors: MseColor[];
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
                i === 0
                  ? `linear-gradient(90deg,${gradient})`
                  : `linear-gradient(270deg,${gradient})`,
              WebkitMaskImage:
                i === 0
                  ? `linear-gradient(90deg,${gradient})`
                  : `linear-gradient(270deg,${gradient})`,
            }}
          />
        );
      })}
    </>
  );
};
export default memo(HybridBackground);
