import React from 'react';
import * as mtg from '@mse/types';
import { FormattedText } from './FormattedText';
import { useTheme } from '@emotion/react';

export const TopLine: React.FC<mtg.CardComponentProps> = ({ card }) => {
  const theme = useTheme();
  return (
    <div css={theme.components.topline}>
      <div css={theme.components.name}>{card.name}</div>

      <div css={theme.components.cost}>
        {card.manaCost ? (
          <FormattedText text={card.manaCost} size='large' />
        ) : null}
      </div>
    </div>
  );
};
