import React from 'react';
import { mtg } from '../../typings/mtg';

export const CardArtwork: React.FC<mtg.CardComponentProps> = ({
  card,
  style,
}) => {
  return <div style={style}>ARTWORK</div>;
};
