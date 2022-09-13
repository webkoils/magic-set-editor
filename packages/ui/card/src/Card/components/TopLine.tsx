import React from 'react';
import * as mtg from '@mse/types';
import { FormattedText } from './FormattedText';
import { templateClasses } from '../cardComponentStyles';

export const TopLine: React.FC<mtg.CardComponentProps> = ({ card }) => {
  return (
    <div className={templateClasses.topline}>
      <div className={templateClasses.name}>{card.name}</div>

      <div className={templateClasses.cost}>
        {card.manaCost ? (
          <FormattedText text={card.manaCost} size='large' />
        ) : null}
      </div>
    </div>
  );
};
