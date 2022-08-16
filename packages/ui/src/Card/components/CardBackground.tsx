import React from 'react';
import { mtg } from '../../typings/mtg';
import { M15_ASSETS as templateAssets } from '@mse/assets';

const backgroundImageForProps = (card: mtg.Card) => {
  let allColors = mtg.sortColors(card.color).join('');
  let isLand = card.types.find((t) => t.toLowerCase() === 'land');
  switch (allColors) {
    case mtg.Color.WHITE: {
      return !isLand ? templateAssets.wcard : templateAssets.wlcard;
    }
    case mtg.Color.BLUE: {
      return !isLand ? templateAssets.ucard : templateAssets.ulcard;
    }
    case mtg.Color.BLACK: {
      return !isLand ? templateAssets.bcard : templateAssets.blcard;
    }
    case mtg.Color.RED: {
      return !isLand ? templateAssets.rcard : templateAssets.rlcard;
    }
    case mtg.Color.GREEN: {
      return !isLand ? templateAssets.gcard : templateAssets.glcard;
    }
    default: {
      return !isLand ? templateAssets.ccard : templateAssets.clcard;
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
