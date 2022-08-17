import React from 'react';
import { mtg } from '../../typings/mtg';
import { M15_ASSETS as templateAssets } from '@mse/assets';
import styled from '@emotion/styled';
import { cardComponentStyles } from './cardComponentStyles';

const gradientForColors = (colors: mtg.Color[]) => {
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

const backgroundImageForColor = (color: mtg.Color, isLand: boolean) => {
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
  }
};

const backgroundForProps = (card: mtg.Card) => {
  let isLand = Boolean(card.types.find((t) => t.toLowerCase() === 'land'));
  if (card.color.length === 1) {
    const color = card.color[0];
    return backgroundImageForColor(color, isLand) + ' ';
  } else if (card.color.length >= 2) {
    return `url(${!isLand ? templateAssets.mcard : templateAssets.mlcard})`;
  }
};

export const Background = styled('div')<mtg.CardComponentProps>(({ card }) => ({
  background: backgroundForProps(card),
  backgroundSize: 'cover',
  ...cardComponentStyles[mtg.CardComponentType.BACKGROUND],
}));
