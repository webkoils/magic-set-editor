import React from 'react';
import { useCardContext } from '../../index';
import { templateClasses } from '../../CardTemplate/CardTemplate';

export const Artwork: React.FC<{ src?: string }> = () => {
  const { card } = useCardContext();

  return (
    <div
      className={templateClasses.artwork.root}
      style={{
        backgroundImage: card.artworkSrc
          ? `url(${card.artworkSrc})`
          : 'linear-gradient(45deg, #000,#FFF)',
      }}
    />
  );
};
