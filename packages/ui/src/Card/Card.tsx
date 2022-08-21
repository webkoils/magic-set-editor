import React, { useRef } from 'react';
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
import { CardTemplateProvider } from '../CardTemplate';
import '@mse/assets/fonts/beleren/index.css';
import '@mse/assets/fonts/mplantin/latin.css';

export const Card: React.FC<mtg.CardComponentProps> = ({ card }) => {
  return (
    <CardProvider card={card}>
      <CardTemplateProvider template={card.template}>
        <svg
          height='100%'
          width={'100%'}
          viewBox={'0 0 375 523'}
          preserveAspectRatio='xMinYMin meet'
        >
          <foreignObject x={0} height={523} width={375} y={0}>
            <div style={{ height: '100%', width: '100%', fontSize: '1rem' }}>
              <Background card={card} />
              <TopLine card={card} />
              <TypeLine card={card} />
              <TextBox card={card} />
              <Artwork src={card.artworkSrc} />
              <PT card={card} />
            </div>
          </foreignObject>
        </svg>
      </CardTemplateProvider>
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
