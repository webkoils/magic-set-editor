import React from 'react';
import * as mtg from '@mse/types';
import { useTheme } from '@emotion/react';

export const TypeLine: React.FC<mtg.CardComponentProps> = ({ card }) => {
  const theme = useTheme();
  return (
    <div css={theme.components.type}>
      {card.supertype} {card.types.join(' ')}{' '}
      {card.subtypes && card.subtypes.length > 0 && ' – '}{' '}
      {card.subtypes?.join(' ')}
    </div>
  );
};
