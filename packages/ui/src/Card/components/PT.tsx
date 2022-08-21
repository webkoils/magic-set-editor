import styled from '@emotion/styled';
import { M15_ASSETS as templateAssets } from '@mse/assets/dist';
import React from 'react';
import * as mtg from '@mse/types';
import { getCardIdentity, sortColors } from '@mse/utils';

const ptBackgroundImage = (card: mtg.Card) => {
  let identity = getCardIdentity(card);
  let allColors = sortColors(identity.colors).join('');
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
    case mtg.Color.COLORLESS: {
      return !isLand ? templateAssets.cpt : templateAssets.clpt;
    }
    default: {
      return !isLand ? templateAssets.mpt : templateAssets.mlpt;
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

const PTContainer = styled('div')<mtg.CardComponentProps>(
  ({ theme, card }) => ({
    ...theme.components.pt,
    backgroundImage: `url(${ptBackgroundImage(card)})`,
  })
);

const PTText = styled('div')(() => ({
  fontSize: '1em',
  textAlign: 'center',
  position: 'relative',
  left: 100 * (13 / 81) + '%',
  top: 100 * (3 / 42) + '%',
  width: 100 * (60 / 81) + '%',
  height: 100 * (28 / 42) + '%',
}));
export const PT: React.FC<mtg.CardComponentProps> = ({ card, style }) => {
  return typeof card.power !== 'undefined' &&
    typeof card.toughness !== 'undefined' ? (
    <PTContainer card={card}>
      <PTText>
        {card.power}/{card.toughness}
      </PTText>
    </PTContainer>
  ) : null;
};
