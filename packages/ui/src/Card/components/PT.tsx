import { M15_ASSETS as templateAssets } from '@mse/assets/dist';
import React from 'react';
import * as mtg from '@mse/types';
import { getCardIdentity, sortColors } from '@mse/utils';
import { templateClasses } from '../cardComponentStyles';

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

export const PT: React.FC<mtg.CardComponentProps> = ({ card }) => {
  return typeof card.power !== 'undefined' &&
    typeof card.toughness !== 'undefined' ? (
    <div
      className={templateClasses.pt}
      style={{ backgroundImage: `url(${ptBackgroundImage(card)})` }}
    >
      <div>
        {card.power}/{card.toughness}
      </div>
    </div>
  ) : null;
};
