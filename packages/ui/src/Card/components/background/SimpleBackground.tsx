import { Color } from '@mse/types';
import { backgroundImageForColor } from './background-utils';
import { useTheme } from '@emotion/react';
import React from 'react';

export const SimpleBackground: React.FC<{
  color: Color | 'multi';
  isLand: boolean;
}> = ({ color, isLand }) => {
  const theme = useTheme();
  return (
    <div
      css={theme.components.background}
      style={{ backgroundImage: backgroundImageForColor(color, isLand) }}
    />
  );
};
