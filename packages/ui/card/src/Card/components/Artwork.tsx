import React from 'react';
import { useCardContext } from '../../index';
import { CardTemplateClassNames } from '@mse/templates.m15';

export const Artwork: React.FC<{ src?: string }> = () => {
  const { card } = useCardContext();

  return (
    <div
      className={CardTemplateClassNames.artwork}
      style={{
        backgroundImage: card.artworkSrc
          ? `url(${card.artworkSrc})`
          : 'linear-gradient(45deg, #000,#FFF)',
      }}
    />
  );
};
