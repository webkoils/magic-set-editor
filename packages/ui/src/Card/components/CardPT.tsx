import { templateM15 } from '@scener/ui/../assets/dist';
import React from 'react';
import { mtg } from '../../typings/mtg';

const ptBackgroundImage = (card: mtg.Card) => {
  let allColors = mtg.sortColors(card.color).join('');
  let isLand = card.types.find((t) => t.toLowerCase() === 'land');
  switch (allColors) {
    case mtg.Color.WHITE: {
      return !isLand ? templateM15.wpt : templateM15.wlpt;
    }
    case mtg.Color.BLUE: {
      return !isLand ? templateM15.upt : templateM15.ulpt;
    }
    case mtg.Color.BLACK: {
      return !isLand ? templateM15.bpt : templateM15.blpt;
    }
    case mtg.Color.RED: {
      return !isLand ? templateM15.rpt : templateM15.rlpt;
    }
    case mtg.Color.GREEN: {
      return !isLand ? templateM15.gpt : templateM15.glpt;
    }
    default: {
      return !isLand ? templateM15.cpt : templateM15.clpt;
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
