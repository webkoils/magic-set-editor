import React from 'react';
import { Background } from './components/Background';
import { mtg } from '../typings/mtg';
import { cardComponentStyles, theme } from './components/cardComponentStyles';
import { TopLine } from './components/TopLine';
import { TypeLine } from './components/TypeLine';
import { TextBox } from './components/TextBox';
import { Artwork } from './components/Artwork';
import { PT } from './components/PT';
import { ThemeProvider } from '@emotion/react';
import { useContext } from 'react';
import { FC } from 'react';

export const Card: React.FC<mtg.CardComponentProps> = ({ card }) => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 0,
          paddingTop: (523 / 375) * 100 + '%',
        }}
      >
        <CardProvider card={card}>
          <div css={cardComponentStyles[mtg.CardComponentType.CARD]}>
            <Background card={card} />
            <TopLine card={card} />
            <TypeLine card={card} />
            <TextBox card={card} />
            <Artwork card={card} />
            <PT card={card} />
          </div>
        </CardProvider>
      </div>
    </ThemeProvider>
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
