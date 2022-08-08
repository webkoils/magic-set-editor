import React from 'react';
import { mtg } from '../../typings/mtg';
import { cardComponentStyles } from './cardComponentStyles';
import { CardFormattedText } from './CardFormattedText';

export const CardTextBox: React.FC<mtg.CardComponentProps> = ({
  style,
  card,
}) => {
  return (
    <div style={style}>
      {card.rulesText.map((text) => (
        <span
          key={text}
          style={cardComponentStyles[mtg.CardComponentType.RULESTEXT]}
        >
          <CardFormattedText text={text} />
        </span>
      ))}
      {card.flavorText && (
        <>
          <hr />
          <span style={cardComponentStyles[mtg.CardComponentType.RULESTEXT]}>
            <CardFormattedText text={card.flavorText} />
          </span>
        </>
      )}
    </div>
  );
};
