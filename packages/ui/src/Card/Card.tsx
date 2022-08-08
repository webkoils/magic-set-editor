import React from 'react';
import { CardBackground } from './components';
import { mtg } from '../typings/mtg';
import { cardComponentStyles } from './components/cardComponentStyles';
import { CardTopLine } from './components/CardTopLine';
import { CardType } from './components/CardType';
import { CardTextBox } from './components/CardTextBox';
import { CardArtwork } from './components/CardArtwork';
import { CardPT } from './components/CardPT';

export const Card: React.FC<mtg.CardComponentProps> = ({ card }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 0,
        paddingTop: (523 / 375) * 100 + '%',
      }}
    >
      <div style={cardComponentStyles[mtg.CardComponentType.CARD]}>
        <CardBackground
          card={card}
          style={cardComponentStyles[mtg.CardComponentType.BACKGROUND]}
        />
        <CardTopLine
          card={card}
          style={cardComponentStyles[mtg.CardComponentType.TOPLINE]}
        />
        <CardType
          card={card}
          style={cardComponentStyles[mtg.CardComponentType.TYPE]}
        />
        <CardTextBox
          card={card}
          style={cardComponentStyles[mtg.CardComponentType.TEXTBOX]}
        />
        <CardArtwork
          card={card}
          style={cardComponentStyles[mtg.CardComponentType.ARTWORK]}
        />
        <CardPT
          card={card}
          style={cardComponentStyles[mtg.CardComponentType.PT]}
        />
      </div>
    </div>
  );
};
