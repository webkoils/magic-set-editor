import React from 'react';
import { mtg } from '../../typings/mtg';

export const CardType: React.FC<mtg.CardComponentProps> = ({ card, style }) => {
  return (
    <div style={style}>
      {card.supertype} {card.types.join(' ')}{' '}
      {card.subtypes && card.subtypes.length > 0 && ' – '}{' '}
      {card.subtypes?.join(' ')}
    </div>
  );
};
