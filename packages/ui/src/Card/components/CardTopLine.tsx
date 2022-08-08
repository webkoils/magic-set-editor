import React from 'react';
import { mtg } from '../../typings/mtg';
import { cardComponentStyles } from './cardComponentStyles';
import { CardCost } from './CardCost';
import { CardName } from './CardName';

export const CardTopLine: React.FC<mtg.CardComponentProps> = ({
  card,
  style,
}) => {
  return (
    <div style={style}>
      <CardName
        style={cardComponentStyles[mtg.CardComponentType.NAME]}
        card={card}
      />
      <CardCost
        style={cardComponentStyles[mtg.CardComponentType.COST]}
        card={card}
      />
    </div>
  );
};
