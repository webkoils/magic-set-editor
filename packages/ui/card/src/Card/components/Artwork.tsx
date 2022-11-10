import React from 'react';
import { useCardContext } from '../../index';
import { templateClasses } from '../../CardTemplate/index';

export const Artwork: React.FC<{}> = () => {
  const { card } = useCardContext();

  return (
    <div
      className={templateClasses.card.artwork}
      style={{
        backgroundImage: card.artworkUrl
          ? `url(${card.artworkUrl})`
          : 'linear-gradient(45deg, #000,#FFF)',
      }}
    />
  );
};
