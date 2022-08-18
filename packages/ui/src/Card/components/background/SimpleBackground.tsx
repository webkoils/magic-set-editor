import { Color } from '@mse/types';
import styled from '@emotion/styled';
import { backgroundImageForColor } from './background-utils';

export const SimpleBackground = styled('div', {
  shouldForwardProp: (propName) => propName !== 'style',
})<{
  color: Color | 'multi';
  isLand: boolean;
}>(({ color, theme, isLand, style }) => ({
  background: backgroundImageForColor(color, isLand),
  backgroundSize: 'cover',
  ...theme.components.background,
  ...style,
}));
