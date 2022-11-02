import { MseColor } from '@mse/types';
import { backgroundImageForColor } from './background-utils';
import React from 'react';
import { CardTemplateClassNames } from '@mse/templates.m15';
export const SimpleBackground: React.FC<{
  color: MseColor | 'multi';
  isLand: boolean;
  style?: React.CSSProperties;
}> = ({ color, isLand, style }) => {
  return (
    <div
      className={CardTemplateClassNames.background}
      style={{
        padding: 0,
        background: backgroundImageForColor(color, isLand),
        ...style,
      }}
    />
  );
};
