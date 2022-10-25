import {
  MseColor,
  MseCard,
  MseCardIdentity,
  isColor,
  MSE_COLOR_SORT_ORDER,
} from '@mse/types';
export const sortColors = (colors: MseColor[]) => {
  return colors
    .slice()
    .sort((a, b) => MSE_COLOR_SORT_ORDER[b] - MSE_COLOR_SORT_ORDER[a]);
};
export const isCardLand = (card: MseCard) => {
  return Boolean(card.types.find((t) => t.toLowerCase() === 'land'));
};

export const isCardHybrid = (card: MseCard) => {
  if (card.identity) {
    return card.identity.isHybrid;
  }
  let { identityColors } = getCardColors(card);
  console.log(card.name, identityColors);
  if (!isCardLand(card) && card.manaCost) {
    return (
      identityColors.length === 2 &&
      Boolean(card.manaCost.match(/([WUBRG][WUBRG])/g))
    );
  } else {
    return identityColors.length === 2;
  }
};

const symbolRegex = /\((.+?)\)/gi;

export const findSymbolsInText = (text: string) => {
  let symbolMatches: RegExpExecArray | null = null;
  const foundSymbols = [];
  do {
    symbolMatches = symbolRegex.exec(text);
    if (symbolMatches) {
      if (symbolMatches[1]) {
        foundSymbols.push(symbolMatches[1]);
      }
    }
  } while (symbolMatches);
  return foundSymbols;
};

export const findColorsInText = (text: string) => {
  let colors: Record<MseColor, boolean> = {
    [MseColor.WHITE]: false,
    [MseColor.BLUE]: false,
    [MseColor.BLACK]: false,
    [MseColor.GREEN]: false,
    [MseColor.RED]: false,
    [MseColor.COLORLESS]: false,
  };
  let matches = findSymbolsInText(text);
  matches.forEach((key) => {
    const val = key.replace('mana_', '').toLowerCase().split('');
    val.forEach((c) => {
      console.log(c);
      if (isColor(c)) {
        colors[c] = true;
      }
    });
  });

  return colors;
};
export const getCardColors = (
  card: MseCard
): { identityColors: MseColor[]; colors: MseColor[] } => {
  let colors: Record<MseColor, boolean> = findColorsInText(card.manaCost || '');

  let textColors = findColorsInText(card.rulesText);
  let identityColors: Record<MseColor, boolean> = {
    [MseColor.WHITE]: false,
    [MseColor.BLUE]: false,
    [MseColor.BLACK]: false,
    [MseColor.GREEN]: false,
    [MseColor.RED]: false,
    [MseColor.COLORLESS]: false,
  };
  for (let color in identityColors) {
    identityColors[color as MseColor] =
      textColors[color as MseColor] || colors[color as MseColor];
  }
  return {
    identityColors: Object.keys(identityColors).filter(
      (c) => identityColors[c as MseColor] === true
    ) as MseColor[],
    colors: Object.keys(colors).filter(
      (c) => identityColors[c as MseColor] === true
    ) as MseColor[],
  };
};

export const getCardIdentity = (card: MseCard): MseCardIdentity => {
  if (card.identity) {
    return card.identity;
  }
  let isLand = isCardLand(card);
  let isHybrid = isCardHybrid(card);
  let { colors, identityColors } = getCardColors(card);
  return {
    identityColors,
    colors,
    isHybrid,
    isLand,
  };
};
