import React from 'react';
import { mtg } from '../../typings/mtg';
import { templateM15 } from '@mse/assets';

const backgroundImageForProps = (card: mtg.Card) => {
  let allColors = mtg.sortColors(card.color).join('');
  let isLand = card.types.find((t) => t.toLowerCase() === 'land');
  switch (allColors) {
    case mtg.Color.WHITE: {
      return !isLand ? templateM15.wcard : templateM15.wlcard;
    }
    case mtg.Color.BLUE: {
      return !isLand ? templateM15.ucard : templateM15.ulcard;
    }
    case mtg.Color.BLACK: {
      return !isLand ? templateM15.bcard : templateM15.blcard;
    }
    case mtg.Color.RED: {
      return !isLand ? templateM15.rcard : templateM15.rlcard;
    }
    case mtg.Color.GREEN: {
      return !isLand ? templateM15.gcard : templateM15.glcard;
    }
    default: {
      return !isLand ? templateM15.ccard : templateM15.clcard;
    }
  }
};

export const CardBackground: React.FC<mtg.CardComponentProps> = ({
  card,
  style,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageForProps(card)})`,

        ...style,
      }}
    ></div>
  );
};
