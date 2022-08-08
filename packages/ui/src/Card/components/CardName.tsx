import React from 'react';
import { mtg } from '../../typings/mtg';

export const CardName: React.FC<mtg.CardComponentProps> = ({ card, style }) => {
  return <div style={style}>{card.name}</div>;
};
