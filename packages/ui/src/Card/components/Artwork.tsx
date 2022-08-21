import { useTheme } from '@emotion/react';
import React from 'react';

export const Artwork: React.FC<{ src?: string }> = ({ src }) => {
  const theme = useTheme();
  return (
    <div
      css={theme.components.artwork}
      style={{
        backgroundImage: src
          ? `url(${src})`
          : 'linear-gradient(45deg, #000,#FFF)',
      }}
    />
  );
};
