import React from 'react';
import * as mtg from '@mse/types';

import {
  TypeLine,
  TopLine,
  TextBox,
  Artwork,
  PT,
  Background,
} from './components';
import { useContext } from 'react';
import { FC } from 'react';
import styled from '@emotion/styled';
import { CardTemplateProvider } from '../CardTemplate';

const CardSizer = styled('div')({
  height: '100%',
  width: '100%',
  left: 0,
  top: 0,
  zIndex: 0,
  position: 'absolute',
});
const CardContainer = styled('div', {
  shouldForwardProp(propName) {
    return propName != 'scale';
  },
})<{ scale?: number }>(({ theme, scale = 1 }) => ({
  ...theme.components[mtg.CardComponentType.CARD],
  fontSize: scale + 'rem',
}));

export const Card: React.FC<mtg.CardComponentProps & { scale?: number }> = ({
  card,
  scale = 1,
}) => {
  return (
    <CardProvider card={card}>
      <CardTemplateProvider template={card.template}>
        <CardContainer scale={scale}>
          <CardSizer>
            <Background card={card} />
            <TopLine card={card} />
            <TypeLine card={card} />
            <TextBox card={card} />
            <Artwork card={card} />
            <PT card={card} />
          </CardSizer>
        </CardContainer>
      </CardTemplateProvider>{' '}
    </CardProvider>
  );
};

export const CardContext = React.createContext<mtg.Card | undefined>(undefined);
export const useCard = () => {
  const card = useContext(CardContext);
  if (typeof card === 'undefined') throw new Error('Card context not set');
  return card;
};
export const CardProvider: FC<React.PropsWithChildren<{
  card: mtg.Card | undefined;
}>> = ({ card, children }) => {
  return <CardContext.Provider value={card}>{children}</CardContext.Provider>;
};
