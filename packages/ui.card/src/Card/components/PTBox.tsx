import { M15_ASSETS as templateAssets } from '@mse/assets/dist';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as mtg from '@mse/types';
import { getCardIdentity, isCardLand, sortColors } from '@mse/utils.card';
import { templateClasses } from '../../CardTemplate/index';
import { CardField } from '../../CardField/CardField';

const ptBackgroundImage = (card: mtg.MseCard) => {
  const identity = getCardIdentity(card);
  const allColors = sortColors(identity.colors).join('');
  const isLand = isCardLand(card);

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

export const PTBox: React.FC<mtg.MseCardComponentProps> = ({
  card,
  readonly,
  onChange,
}) => {
  const powerRef = useRef<HTMLDivElement | null>(null);
  const toughnessRef = useRef<HTMLDivElement | null>(null);
  const [focusedInputs, setFocusedInputs] = useState({
    power: false,
    toughness: false,
  });
  const isFocused = useMemo(
    () => focusedInputs.power || focusedInputs.toughness,
    [focusedInputs]
  );
  const onFocus = useCallback(
    (key: string) => () => {
      setFocusedInputs((fi) => ({ ...fi, [key]: true }));
    },
    []
  );
  const onBlur = useCallback(
    (key: string) => () => {
      setFocusedInputs((fi) => ({ ...fi, [key]: false }));
    },
    []
  );
  useEffect(() => {
    const powerFocus = onFocus('power');
    const toughFocus = onFocus('toughness');
    const powerBlur = onBlur('power');
    const toughBlur = onBlur('toughness');
    const powerInput = powerRef.current;
    const toughnessInput = toughnessRef.current;

    powerInput?.addEventListener('focus', powerFocus);
    toughnessInput?.addEventListener('focus', toughFocus);
    powerInput?.addEventListener('blur', powerBlur);
    toughnessInput?.addEventListener('blur', toughBlur);
    return () => {
      powerInput?.removeEventListener('focus', powerFocus);
      toughnessInput?.removeEventListener('focus', toughFocus);
      powerInput?.removeEventListener('blur', powerBlur);
      toughnessInput?.removeEventListener('blur', toughBlur);
    };
  }, [onBlur, onFocus]);

  return (
    <div
      onClick={() => {
        !readonly && powerRef.current?.focus();
      }}
      className={templateClasses.card.pt}
      style={{
        cursor: !readonly ? 'pointer' : undefined,

        backgroundImage:
          card && (card?.power || card?.toughness || isFocused)
            ? `url(/${ptBackgroundImage(card)})`
            : undefined,
      }}
    >
      <div className={templateClasses.card.ptLabel}>
        <CardField
          id={'power'}
          card={card}
          className={templateClasses.card.power}
          inputRef={powerRef}
          onChange={onChange}
          readonly={readonly}
        />
        {!!(card?.power || card?.toughness) && (
          <div className={templateClasses.card.ptDivider}>/</div>
        )}
        <CardField
          id={'toughness'}
          card={card}
          inputRef={toughnessRef}
          onChange={onChange}
          className={templateClasses.card.toughness}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
