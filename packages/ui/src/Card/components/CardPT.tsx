import { M15_ASSETS as templateAssets } from '@mse/ui/../assets/dist';
import React from 'react';
import { mtg } from '../../typings/mtg';

const ptBackgroundImage = (card: mtg.Card) => {
  let allColors = mtg.sortColors(card.color).join('');
  let isLand = card.types.find((t) => t.toLowerCase() === 'land');
  switch (allColors) {
    case mtg.Color.WHITE: {
      return !isLand ? templateAssets.wpt : templateAssets.wlpt;
    }
    case mtg.Color.BLUE: {
      return !isLand ? templateAssets.upt : templateAssets.ulpt;
    }
    case mtg.Color.BLACK: {
      return !isLand ? templateAssets.bpt : templateAssets.blpt;
    }
    case mtg.Color.RED: {
      return !isLand ? templateAssets.rpt : templateAssets.rlpt;
    }
    case mtg.Color.GREEN: {
      return !isLand ? templateAssets.gpt : templateAssets.glpt;
    }
    default: {
      return !isLand ? templateAssets.cpt : templateAssets.clpt;
    }
  }
};

/*

pt:
		z index: 2
		left: 286
		top: 469
		width: 60
		height:	28
		alignment: center middle shrink-overflow
		font:
			name: Beleren Bold
			size: 16
			color: black
			separator color: red
pt box:
		left: 273
		top: 466
		width: 81
		height:	42
*/

export const CardPT: React.FC<mtg.CardComponentProps> = ({ card, style }) => {
  return typeof card.power !== 'undefined' &&
    typeof card.toughness !== 'undefined' ? (
    <div
      style={{
        ...style,
        backgroundImage: `url(${ptBackgroundImage(card)})`,
        backgroundSize: 'contain',
      }}
    >
      <div
        style={{
          fontSize: '1rem',
          textAlign: 'center',
          position: 'relative',
          left: 100 * (13 / 81) + '%',
          top: 100 * (3 / 42) + '%',
          width: 100 * (60 / 81) + '%',
          height: 100 * (28 / 42) + '%',
        }}
      >
        {card.power}/{card.toughness}
      </div>
    </div>
  ) : null;
};
