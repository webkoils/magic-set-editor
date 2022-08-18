import styled from '@emotion/styled';
import * as mtg from '@mse/types';
export const Artwork = styled('div')<mtg.CardComponentProps>(
  ({ theme, card }) => ({
    backgroundImage: card.artworkSrc
      ? `url(${card.artworkSrc}) `
      : 'linear-gradient(45deg, #000,#FFF)',
    ...theme.components[mtg.CardComponentType.ARTWORK],
  })
);
