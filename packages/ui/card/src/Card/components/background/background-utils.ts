import * as mtg from '@mse/types';
import { M15_ASSETS as templateAssets } from '@mse/assets';

export const gradientForColors = (colors: mtg.Color[]) => {
  const gradientcolors = colors.map((color) => {
    switch (color) {
      case mtg.Color.WHITE: {
        return 'rgba(255,255,255,.4)';
      }
      case mtg.Color.BLUE: {
        return 'rgba(0,0,255,.4)';
      }
      case mtg.Color.BLACK: {
        return 'rgba(0,0,0,.4)';
      }
      case mtg.Color.RED: {
        return 'rgba(255,0,0,.4)';
      }
      case mtg.Color.GREEN: {
        return 'rgba(0,255,0,.4)';
      }
    }
  });
  return `linear-gradient(90deg, ${gradientcolors.join(',')})`;
};

export const backgroundImageForColor = (
  color: mtg.Color | 'multi',
  isLand: boolean
) => {
  switch (color) {
    case mtg.Color.COLORLESS: {
      return `url(${!isLand ? templateAssets.ccard : templateAssets.clcard})`;
    }
    case mtg.Color.WHITE: {
      return `url(${!isLand ? templateAssets.wcard : templateAssets.wlcard})`;
    }
    case mtg.Color.BLUE: {
      return `url(${!isLand ? templateAssets.ucard : templateAssets.ulcard})`;
    }
    case mtg.Color.BLACK: {
      return `url(${!isLand ? templateAssets.bcard : templateAssets.blcard})`;
    }
    case mtg.Color.RED: {
      return `url(${!isLand ? templateAssets.rcard : templateAssets.rlcard})`;
    }
    case mtg.Color.GREEN: {
      return `url(${!isLand ? templateAssets.gcard : templateAssets.glcard})`;
    }
    case 'multi': {
      return `url(${!isLand ? templateAssets.mcard : templateAssets.mlcard})`;
    }
  }
};
