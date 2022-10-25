import React, { CSSProperties, memo, ReactNode, useMemo } from 'react';
import * as mse from '@mse/types';
import { CircleBackground } from './mana/CircleBackground';

export interface MtgSymbolProps extends Partial<JSX.IntrinsicElements['svg']> {
  circle?: boolean;
  color: mse.MseColor;
  shadow?: boolean;
  name?: string;
  size?: CSSProperties['fontSize'];
}

export const MtgSymbol: React.FC<MtgSymbolProps> = memo(
  ({
    color,
    shadow,
    circle = true,
    children,
    style,
    size = '1em',
    ...others
  }) => {
    return (
      <svg
        xmlns='http://www.w3.org/1999/xhtml'
        preserveAspectRatio='xMinYMin meet'
        viewBox='0 0 104 104'
        style={{
          height: size,
          width: size,
          overflow: 'visible',
          transform: 'translate(0, .125em)',
          ...style,
        }}
        {...others}
      >
        {!!circle && <CircleBackground color={color} shadow={shadow} />}
        <g transform={'translate(-50 -50)'}>
          {' '}
          <svg x={52} y={52} height={100} width={100}>
            {children}
          </svg>
        </g>
      </svg>
    );
  }
);
