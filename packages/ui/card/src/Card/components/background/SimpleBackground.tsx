import { MseColor } from '@mse/types';
import { backgroundImageForColor } from './background-utils';
import React, { memo } from 'react';
import { templateClasses } from '../../../CardTemplate/index';
export const SimpleBackground: React.FC<{
  color: MseColor | 'multi';
  isLand: boolean;
  style?: React.CSSProperties;
}> = memo(({ color, isLand, style }) => {
  return (
    <div
      className={templateClasses.card.background}
      style={{
        padding: 0,
        background: backgroundImageForColor(color, isLand),
        ...style,
      }}
    />
  );
});
