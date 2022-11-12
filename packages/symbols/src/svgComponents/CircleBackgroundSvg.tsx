import React, { memo } from 'react';
import * as mse from '@mse/types';
import { mtgSymbolClasses } from '../mtgSymbolClasses';

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

const CircleBackgroundSvg: React.FC<
  {
    color: mse.MseColor;
  } & Partial<JSX.IntrinsicElements['circle']>
> = ({ color, ...props }) => {
  return (
    <circle
      {...props}
      cx={'50%'}
      cy={'50%'}
      r='50'
      className={
        mtgSymbolClasses.background.root +
        ' ' +
        mtgSymbolClasses.background[color]
      }
      style={{
        overflow: 'visible',
        fill: getFillColor(color),
      }}
    />
  );
};
export default memo(CircleBackgroundSvg);
