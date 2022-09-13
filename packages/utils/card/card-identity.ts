import {
  Color,
  Card,
  CardIdentity,
  isColor,
  COLOR_SORT_ORDER,
} from '@mse/types';

export const sortColors = (colors: Color[]) => {
  return colors
    .slice()
    .sort((a, b) => COLOR_SORT_ORDER[b] - COLOR_SORT_ORDER[a]);
};
export const isCardLand = (card: Card) => {
  return Boolean(card.types.find((t) => t.toLowerCase() === 'land'));
};

export const isCardHybrid = (card: Card) => {
  if (card.identity) {
    return card.identity.isHybrid;
  }
  let { identityColors } = getCardColors(card);
  console.log(card.name, identityColors);
  if (!isCardLand(card) && card.manaCost) {
    return (
      identityColors.length === 2 &&
      Boolean(card.manaCost.match(/symbols\.mana_[wubrg][wubrg]/gi))
    );
  } else {
    return identityColors.length === 2;
  }
};

const symbolRegex = /\{\{(.+?)\}\}/gi;

export const findSymbolsInText = (text: string) => {
  let symbolMatches: RegExpExecArray | null = null;
  const foundSymbols = [];
  do {
    symbolMatches = symbolRegex.exec(text);
    if (symbolMatches) {
      if (symbolMatches[1]) {
        foundSymbols.push(
          ...symbolMatches[1].split(' ').map((sym) => sym.split('.'))
        );
      }
    }
  } while (symbolMatches);
  return foundSymbols;
};

export const findColorsInText = (text: string) => {
  let colors: Record<Color, boolean> = {
    [Color.WHITE]: false,
    [Color.BLUE]: false,
    [Color.BLACK]: false,
    [Color.GREEN]: false,
    [Color.RED]: false,
    [Color.COLORLESS]: false,
  };
  let matches = findSymbolsInText(text);
  matches.forEach(([parent, key]) => {
    if (parent == 'symbols' && key.match(/mana_/gi)) {
      const val = key.replace('mana_', '').split('');
      val.forEach((c) => {
        if (isColor(c)) {
          colors[c] = true;
        }
      });
    }
  });

  return colors;
};
export const getCardColors = (
  card: Card
): { identityColors: Color[]; colors: Color[] } => {
  let colors: Record<Color, boolean> = findColorsInText(card.manaCost || '');

  let textColors = findColorsInText(card.rulesText.join(' '));
  let identityColors: Record<Color, boolean> = {
    [Color.WHITE]: false,
    [Color.BLUE]: false,
    [Color.BLACK]: false,
    [Color.GREEN]: false,
    [Color.RED]: false,
    [Color.COLORLESS]: false,
  };
  for (let color in identityColors) {
    identityColors[color as Color] =
      textColors[color as Color] || colors[color as Color];
  }
  return {
    identityColors: Object.keys(identityColors).filter(
      (c) => identityColors[c as Color] === true
    ) as Color[],
    colors: Object.keys(colors).filter(
      (c) => identityColors[c as Color] === true
    ) as Color[],
  };
};

export const getCardIdentity = (card: Card): CardIdentity => {
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
