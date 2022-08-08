import React from 'react';
import { mtg } from '../../typings/mtg';
import { CardFormattedText } from './CardFormattedText';

export const CardCost: React.FC<mtg.CardComponentProps> = ({ card, style }) => {
  return (
    <div style={style}>
      <CardFormattedText text={card.manaCost} />
    </div>
  );
};
