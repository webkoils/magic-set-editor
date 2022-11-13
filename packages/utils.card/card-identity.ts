import {
  MseColor,
  MseCard,
  MseCardIdentity,
  isColor,
  MSE_COLOR_SORT_ORDER,
} from '@mse/types';

export const cardSorterDesc = (
  a: MseCard,
  b: MseCard,
  orderBy: keyof MseCard
): number => {
  switch (orderBy) {
    case 'identity': {
      let aVal = getDefaultSortValue(a);
      let bVal = getDefaultSortValue(b);
      if (aVal === bVal) {
        return cardSorterDesc(a, b, 'name');
      }
      return bVal - aVal;
    }
    case 'manaCost': {
      let mvA = calculateManaValue(a);
      let mvB = calculateManaValue(b);

      if (mvA === mvB) {
        return cardSorterDesc(a, b, 'identity');
      }

      return mvB - mvA;
    }
    default: {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (typeof aVal === 'undefined' || typeof bVal === 'undefined') {
        if (typeof aVal === typeof bVal) {
          return 0;
        } else if (typeof bVal !== 'undefined') {
          return 1;
        } else if (typeof aVal !== 'undefined') {
          return -1;
        }
      } else {
        if (aVal == bVal) {
          return 0;
        } else if (aVal < bVal) {
          return 1;
        } else {
          return -1;
        }
      }
    }
  }
  return 0;
};

export const getBackgroundColors = (
  colors: MseColor[],
  isHybrid?: boolean
): (MseColor | 'multi')[] => {
  if (colors.length === 2 && isHybrid) {
    return getHybridBackgroundColors([colors[0], colors[1]]);
  } else if (colors.length <= 1) {
    return [colors[0] || MseColor.COLORLESS];
  } else {
    return ['multi'];
  }
};

export const getHybridBackgroundColors = (colors: [MseColor, MseColor]) => {
  let [a, b] = sortColors(colors.slice());
  switch (a) {
    case MseColor.WHITE: {
      switch (b) {
        case MseColor.BLUE: {
          return [a, b];
        }
        case MseColor.BLACK: {
          return [a, b];
        }
        case MseColor.RED: {
          return [b, a];
        }
        case MseColor.GREEN: {
          return [b, a];
        }
        default: {
          return [a];
        }
      }
    }
    case MseColor.BLUE: {
      switch (b) {
        case MseColor.BLACK: {
          return [a, b];
        }
        case MseColor.RED: {
          return [a, b];
        }
        case MseColor.GREEN: {
          return [b, a];
        }
        default: {
          return [a, b];
        }
      }
    }
    case MseColor.BLACK: {
      switch (b) {
        case MseColor.RED: {
          return [a, b];
        }
        case MseColor.GREEN: {
          return [a, b];
        }
        default: {
          return [a];
        }
      }
    }
    case MseColor.RED: {
      switch (b) {
        case MseColor.GREEN: {
          return [a, b];
        }
        default: {
          return [a];
        }
      }
    }
    case MseColor.GREEN: {
      return [a];
    }
    default: {
      return [a];
    }
  }
};

export const sortColors = (colors: MseColor[]) => {
  return colors
    .slice()
    .sort((a, b) => MSE_COLOR_SORT_ORDER[a] - MSE_COLOR_SORT_ORDER[b]);
};
export const isCardLand = (card: MseCard) => {
  return Boolean((card.types || '').toLowerCase().indexOf('land') >= 0);
};

export const isCardHybrid = (card: MseCard) => {
  if (card.identity) {
    return card.identity.isHybrid;
  }
  let { identityColors } = getCardColors(card);

  if (!isCardLand(card) && card.manaCost) {
    return (
      identityColors.length === 2 &&
      Boolean(card.manaCost?.match(/\(P?[WUBRG]\/P?[WUBRG]\)/))
    );
  } else {
    return identityColors.length === 2;
  }
};

export const findSymbolsInText = (text: string, symbolRegex: RegExp) => {
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

export const findAbilityColorsInText = (text: string) => {
  let colors: Record<MseColor, boolean> = {
    [MseColor.WHITE]: false,
    [MseColor.BLUE]: false,
    [MseColor.BLACK]: false,
    [MseColor.GREEN]: false,
    [MseColor.RED]: false,
    [MseColor.COLORLESS]: false,
  };
  let matches = findSymbolsInText(text, /\((P?[WUBRG\/]+?)\).*:/g);
  matches.forEach((key) => {
    const val = key.split('');
    val.forEach((c) => {
      if (isColor(c)) {
        colors[c] = true;
      }
    });
  });

  return colors;
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
  let matches = findSymbolsInText(text, /\((P?[WUBRG\/]+?)\)/g);
  matches.forEach((key) => {
    const val = key.split('');
    val.forEach((c) => {
      if (isColor(c)) {
        colors[c] = true;
      }
    });
  });

  return colors;
};
export const getCardColors = (
  card: MseCard
): {
  identityColors: MseColor[];
  colors: MseColor[];
  costColors: MseColor[];
} => {
  let costColors: Record<MseColor, boolean> = findColorsInText(
    card.manaCost || ''
  );
  let abilityColors: Record<MseColor, boolean> = findAbilityColorsInText(
    card.rulesText || ''
  );

  let textColors = findColorsInText(card.rulesText || '');
  //console.log(colors);
  let colors: Record<MseColor, boolean> = {
    [MseColor.WHITE]: false,
    [MseColor.BLUE]: false,
    [MseColor.BLACK]: false,
    [MseColor.GREEN]: false,
    [MseColor.RED]: false,
    [MseColor.COLORLESS]: false,
  };

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
      textColors[color as MseColor] ||
      costColors[color as MseColor] ||
      abilityColors[color as MseColor];
    colors[color as MseColor] =
      costColors[color as MseColor] || abilityColors[color as MseColor];
  }
  return {
    identityColors: sortColors(
      Object.keys(identityColors).filter(
        (c) => identityColors[c as MseColor] === true
      ) as MseColor[]
    ),
    colors: sortColors(
      Object.keys(colors).filter(
        (c) => colors[c as MseColor] === true
      ) as MseColor[]
    ),
    costColors: sortColors(
      Object.keys(costColors).filter(
        (c) => costColors[c as MseColor] === true
      ) as MseColor[]
    ),
  };
};

export const getDefaultCardIdentity = (): MseCardIdentity => {
  return {
    identityColors: [MseColor.COLORLESS],
    colors: [MseColor.COLORLESS],
    isHybrid: false,
    isLand: false,
    costColors: [],
    backgroundColors: [MseColor.COLORLESS],
  };
};

export const getCardIdentity = (card?: MseCard): MseCardIdentity => {
  if (!card) return getDefaultCardIdentity();
  let isLand = isCardLand(card);
  let isHybrid = isCardHybrid(card);
  let { colors, identityColors, costColors } = getCardColors(card);
  return {
    identityColors,
    colors,
    isHybrid,
    isLand,
    costColors,
    backgroundColors: isLand
      ? getBackgroundColors(identityColors, isHybrid)
      : getBackgroundColors(costColors, isHybrid),
  };
};

export const getDefaultSortValue = (card: MseCard): number => {
  let { colors, isLand } = card.identity || getCardIdentity(card);
  const isArtifact = Boolean(card.types?.toLowerCase().includes('artifact'));
  const isBasicLand =
    isLand && Boolean(card.types?.toLowerCase().includes('basic'));

  const colorCount = colors.length;
  if (!isLand) {
    if (colorCount === 0 && !isArtifact) {
      return 0;
    } else if (colorCount >= 2) {
      return 6;
    } else {
      return MSE_COLOR_SORT_ORDER[colors[0]];
    }
  } else if (isArtifact && !isLand) {
    return 7;
  } else if (isLand && !isBasicLand) {
    return 8;
  } else {
    return 9;
  }
};

export const calculateManaValue = (card: MseCard) => {
  let matches = findSymbolsInText(
    card.manaCost || '',
    /\(([PWUBRG0-9\/]+?)\)/g
  );
  console.log(matches);
  let manaValue = 0;
  matches.forEach((sym) => {
    let splits = sym.replace(/P?([WUBRGC])/g, '1').split('/');
    console.log(sym, sym.replace(/P?([WUBRGC])/g, '1'), splits);

    let numVal = Math.max(...splits.map((n) => parseInt(n, 10)));
    manaValue += numVal;
  });
  return manaValue;
};

export const autoNumberCardSet = (cards: MseCard[]): MseCard[] => {
  const sorter = (a: MseCard, b: MseCard) => -cardSorterDesc(a, b, 'identity');
  const defaultSorted = cards.slice().sort(sorter);
  return defaultSorted.map((c, i) => ({
    ...c,
    collectorNumber: i + 1,
  }));
};
