import React from 'react';
import { templateClasses } from '../../CardTemplate/index';
import { MseCardComponentProps } from '@mse/types';

export const Artwork: React.FC<MseCardComponentProps> = ({ card }) => {
  return (
    <div
      className={templateClasses.card.artwork}
      style={{
        backgroundImage: card?.artworkUrl
          ? `url(${card?.artworkUrl})`
          : 'linear-gradient(45deg, #000,#FFF)',
      }}
    />
  );
};
