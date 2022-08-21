import React from 'react';
import * as mtg from '@mse/types';
import { FormattedText } from './FormattedText';
import { useTheme } from '@emotion/react';

export const TextBox: React.FC<mtg.CardComponentProps> = ({ card }) => {
  const theme = useTheme();
  return (
    <div css={theme.components.textbox}>
      {card.rulesText.map((text) => (
        <span key={text} css={theme.components.rulestext}>
          <FormattedText text={text} size='small' />
        </span>
      ))}
      {card.flavorText && (
        <>
          <div css={theme.components.textDivider} />
          <span css={theme.components.flavortext}>
            <FormattedText text={card.flavorText} size='small' />
          </span>
        </>
      )}
    </div>
  );
};
