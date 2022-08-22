import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../cardComponentStyles';

export const TypeLine: React.FC<mtg.CardComponentProps> = ({ card }) => {
  return (
    <div className={templateClasses.type}>
      {card.supertype} {card.types.join(' ')}{' '}
      {card.subtypes && card.subtypes.length > 0 && ' – '}{' '}
      {card.subtypes?.join(' ')}
    </div>
  );
};
