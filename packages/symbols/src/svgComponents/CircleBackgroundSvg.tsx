import React, { memo } from 'react';
import * as mse from '@mse/types';

const getFillColor = (color: mse.MseColor) => {
  switch (color) {
    case mse.MseColor.BLACK: {
      return 'rgb(186,177,171)';
    }
    case mse.MseColor.BLUE: {
      return 'rgb(193,215,233)';
    }
    case mse.MseColor.GREEN: {
      return 'rgb(163,192,149)';
    }
    case mse.MseColor.WHITE: {
      return 'rgb(248,246,216)';
    }

    case mse.MseColor.RED: {
      return 'rgb(228,153,119)';
    }
    case mse.MseColor.COLORLESS:
    default: {
      return 'rgb(202,197,192)';
    }
  }
};

export const CircleBackgroundSvg: React.FC<
  {
    color: mse.MseColor;
    shadow?: boolean;
  } & Partial<JSX.IntrinsicElements['circle']>
> = memo(({ color, shadow, ...props }) => {
  return (
    <circle
      {...props}
      cx={'50%'}
      cy={'50%'}
      r='50'
      className={
        'MtgSymbolCircleBackground ' + 'MtgSymbolCircleBackground-' + color
      }
      style={{
        overflow: 'visible',
        fill: getFillColor(color),
        filter: shadow ? 'drop-shadow(-2px 4px 2px rgb(0 0 0))' : undefined,
      }}
    />
  );
});
