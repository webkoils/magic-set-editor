import React from 'react';
import { templateClasses } from '../cardComponentStyles';

export const Artwork: React.FC<{ src?: string }> = ({ src }) => {
  return (
    <div
      className={templateClasses.artwork}
      style={{
        backgroundImage: src
          ? `url(${src})`
          : 'linear-gradient(45deg, #000,#FFF)',
      }}
    />
  );
};
