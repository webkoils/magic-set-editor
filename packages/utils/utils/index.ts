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
  if (!isCardLand(card) && card.manaCost) {
    return Boolean(card.manaCost.match(/mana_[wubrg][wubrg]/gi));
  } else {
    let { identityColors } = getCardColors(card);

    return identityColors.length > 1;
  }
};

export const getCardColors = (
  card: Card
): { identityColors: Color[]; colors: Color[] } => {
  let colors: Record<Color, boolean> = {
    [Color.WHITE]: false,
    [Color.BLUE]: false,
    [Color.BLACK]: false,
    [Color.GREEN]: false,
    [Color.RED]: false,
    [Color.COLORLESS]: false,
  };
  let identityColors: Record<Color, boolean> = {
    [Color.WHITE]: false,
    [Color.BLUE]: false,
    [Color.BLACK]: false,
    [Color.GREEN]: false,
    [Color.RED]: false,
    [Color.COLORLESS]: false,
  };
  let manaCostMatches = card.manaCost?.match(/[ {]mana_(.+)[} ]/gi);
  console.log(manaCostMatches);
  if (manaCostMatches) {
    if (manaCostMatches.length) {
      manaCostMatches.forEach((val) => {
        let singleColors = val.split('');
        singleColors.forEach((c) => {
          if (isColor(c)) {
            colors[c] = true;
            identityColors[c] = true;
          }
        });
      });
    }
  }
  let rulesText = card.rulesText.join(' ');
  let rulesTextMatches = rulesText.match(/[ {]mana_(.+)[} ]/gi);
  if (rulesTextMatches) {
    if (rulesTextMatches.length) {
      rulesTextMatches.forEach((val) => {
        let singleColors = val.split('');
        singleColors.forEach((c) => {
          if (isColor(c)) {
            identityColors[c] = true;
          }
        });
      });
    }
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
