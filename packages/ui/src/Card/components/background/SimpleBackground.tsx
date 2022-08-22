import { Color } from '@mse/types';
import { backgroundImageForColor } from './background-utils';
import React from 'react';
import { templateClasses } from '../../cardComponentStyles';
export const SimpleBackground: React.FC<{
  color: Color | 'multi';
  isLand: boolean;
  style?: React.CSSProperties;
}> = ({ color, isLand, style }) => {
  console.log(style);
  return (
    <div
      className={templateClasses.background}
      style={{
        padding: 0,
        background: backgroundImageForColor(color, isLand),
        ...style,
      }}
    />
  );
};
