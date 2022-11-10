import { M15_ASSETS as templateAssets } from '@mse/assets/dist';
import React, { useRef } from 'react';
import * as mtg from '@mse/types';
import {
  getCardIdentity,
  isCardLand,
  sortColors,
} from '../../../../../utils/card/index';
import { templateClasses } from '../../CardTemplate/index';
import { useCardContext } from '../../index';
import { CardField } from '../../CardField/CardField';
import classNames from 'classnames';

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
  const { card, editable } = useCardContext();
  const powerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      onClick={() => {
        editable && powerRef.current?.focus();
      }}
      className={templateClasses.card.pt}
      style={{
        cursor: editable ? 'pointer' : undefined,

        backgroundImage:
          card.power || card.toughness
            ? `url(/${ptBackgroundImage(card)})`
            : undefined,
      }}
    >
      <div className={templateClasses.card.ptLabel}>
        <CardField
          id={'power'}
          className={templateClasses.card.power}
          inputRef={powerRef}
        />
        {!!(card.power || card.toughness) && (
          <div className={templateClasses.card.ptDivider}>/</div>
        )}
        <CardField
          id={'toughness'}
          className={templateClasses.card.toughness}
        />
      </div>
    </div>
  );
};
