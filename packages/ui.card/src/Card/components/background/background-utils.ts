import * as mtg from '@mse/types';
import { M15_ASSETS as templateAssets } from '@mse/assets';

export const gradientForColors = (colors: mtg.MseColor[]) => {
  const gradientcolors = colors.map((color) => {
    switch (color) {
      case mtg.MseColor.WHITE: {
        return 'rgba(255,255,255,.4)';
      }
      case mtg.MseColor.BLUE: {
        return 'rgba(0,0,255,.4)';
      }
      case mtg.MseColor.BLACK: {
        return 'rgba(0,0,0,.4)';
      }
      case mtg.MseColor.RED: {
        return 'rgba(255,0,0,.4)';
      }
      case mtg.MseColor.GREEN: {
        return 'rgba(0,255,0,.4)';
      }
    }
    return 'transparent';
  });
  return `linear-gradient(90deg, ${gradientcolors.join(',')})`;
};

export const backgroundImageForColor = (
  color: mtg.MseColor | 'multi',
  isLand: boolean
) => {
  switch (color) {
    case mtg.MseColor.COLORLESS: {
      return `url(/${!isLand ? templateAssets.ccard : templateAssets.clcard})`;
    }
    case mtg.MseColor.WHITE: {
      return `url(/${!isLand ? templateAssets.wcard : templateAssets.wlcard})`;
    }
    case mtg.MseColor.BLUE: {
      return `url(/${!isLand ? templateAssets.ucard : templateAssets.ulcard})`;
    }
    case mtg.MseColor.BLACK: {
      return `url(/${!isLand ? templateAssets.bcard : templateAssets.blcard})`;
    }
    case mtg.MseColor.RED: {
      return `url(/${!isLand ? templateAssets.rcard : templateAssets.rlcard})`;
    }
    case mtg.MseColor.GREEN: {
      return `url(/${!isLand ? templateAssets.gcard : templateAssets.glcard})`;
    }
    case 'multi': {
      return `url(/${!isLand ? templateAssets.mcard : templateAssets.mlcard})`;
    }
  }
};
