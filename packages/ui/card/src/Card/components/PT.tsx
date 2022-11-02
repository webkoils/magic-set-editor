import { M15_ASSETS as templateAssets } from '@mse/assets/dist';
import React from 'react';
import * as mtg from '@mse/types';
import { getCardIdentity, isCardLand, sortColors } from '@mse/utils.card';
import { CardTemplateClassNames as templateClasses } from '@mse/templates.m15';
import { useCardContext } from '../../index';
import { CardField } from '../../CardField/CardField';

const ptBackgroundImage = (card: mtg.MseCard) => {
  let identity = getCardIdentity(card);
  let allColors = sortColors(identity.colors).join('');
  let isLand = isCardLand(card);
  switch (allColors) {
    case mtg.MseColor.WHITE: {
      return !isLand ? templateAssets.wpt : templateAssets.wlpt;
    }
    case mtg.MseColor.BLUE: {
      return !isLand ? templateAssets.upt : templateAssets.ulpt;
    }
    case mtg.MseColor.BLACK: {
      return !isLand ? templateAssets.bpt : templateAssets.blpt;
    }
    case mtg.MseColor.RED: {
      return !isLand ? templateAssets.rpt : templateAssets.rlpt;
    }
    case mtg.MseColor.GREEN: {
      return !isLand ? templateAssets.gpt : templateAssets.glpt;
    }
    case mtg.MseColor.COLORLESS: {
      return !isLand ? templateAssets.cpt : templateAssets.clpt;
    }
    default: {
      return !isLand ? templateAssets.mpt : templateAssets.mlpt;
    }
  }
};

export const PT: React.FC<mtg.MseCardComponentProps> = () => {
  const { card } = useCardContext();
  return typeof card.power !== 'undefined' &&
    typeof card.toughness !== 'undefined' ? (
    <div
      className={templateClasses.pt}
      style={{ backgroundImage: `url(${ptBackgroundImage(card)})` }}
    >
      <div className={templateClasses.ptLabel}>
        <CardField id={'power'} className={templateClasses.power} />
        <div className={templateClasses.ptDivider}>/</div>
        <CardField id={'toughness'} className={templateClasses.toughness} />
      </div>
    </div>
  ) : null;
};
