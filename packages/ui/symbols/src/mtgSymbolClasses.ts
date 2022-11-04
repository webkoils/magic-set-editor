export interface MtgSymbolClasses {
  root: string;

  /** background color classes (include abbreviations of colors) */
  background: {
    root: string;
    W: string;
    white: string;
    U: string;
    blue: string;
    B: string;
    black: string;
    R: string;
    red: string;
    G: string;
    green: string;
    C: string;
    colorless: string;
    generic: string;
  };

  //mana symbols

  mana: {
    root: string;
    W: string;
    white: string;
    U: string;
    blue: string;
    B: string;
    black: string;
    R: string;
    red: string;
    G: string;
    green: string;
    C: string;
    colorless: string;
    generic: string;
    Inf: string;
    tap: string;
    T: string;
    P: string;
    Phy: string;
  };

  whole: {
    root: string;
  };
  /** Split classes */
  split: {
    root: string;
    half: string;
    third: string;
    half1_2: string;
    half2_2: string;
    third1_3: string;
    third2_3: string;
    third3_3: string;
  };
}

export const mtgSymbolClasses: MtgSymbolClasses = {
  root: 'MtgSymbol',

  /** background classes */
  background: {
    root: 'MtgSymbolBackground',
    W: 'MtgSymbolBackgroundW',
    white: 'MtgSymbolBackgroundW',
    U: 'MtgSymbolBackgroundU',
    blue: 'MtgSymbolBackgroundU',
    B: 'MtgSymbolBackgroundB',
    black: 'MtgSymbolBackgroundB',
    R: 'MtgSymbolBackgroundR',
    red: 'MtgSymbolBackgroundR',
    G: 'MtgSymbolBackgroundG',
    green: 'MtgSymbolBackgroundG',
    C: 'MtgSymbolBackgroundC',
    colorless: 'MtgSymbolBackgroundC',
    generic: 'MtgSymbolBackgroundC',
  },

  //mana symbols

  mana: {
    root: 'MtgSymbolMana',
    W: 'MtgSymbolManaW',
    white: 'MtgSymbolManaW',
    U: 'MtgSymbolManaU',
    blue: 'MtgSymbolManaU',
    B: 'MtgSymbolManaB',
    black: 'MtgSymbolManaB',
    R: 'MtgSymbolManaR',
    red: 'MtgSymbolManaR',
    G: 'MtgSymbolManaG',
    green: 'MtgSymbolManaG',
    C: 'MtgSymbolManaC',
    colorless: 'MtgSymbolManaC',
    generic: 'MtgSymbolManaGeneric',
    tap: 'MtgSymbolManaTap',
    T: 'MtgSymbolManaTap',
    P: 'MtgSymbolManaPhy',
    Phy: 'MtgSymbolManaPhy',
    Inf: 'MtgSymbolManaInf',
  },
  /** background color classes (include abbreviations of colors) */

  /** Split classes */
  whole: {
    root: 'MtgSymbolWhole',
  },
  split: {
    root: 'MtgSymbolSplit',
    half: 'MtgSymbolSplitHalf',
    third: 'MtgSymbolSplitThird',
    half1_2: 'MtgSymbolSplitHalf-1',
    half2_2: 'MtgSymbolSplitHalf-2',
    third1_3: 'MtgSymbolSplitThird-1',
    third2_3: 'MtgSymbolSplitThird-2',
    third3_3: 'MtgSymbolSplitThird-3',
  },
};

export const mtgSymbolShadow = 'drop-shadow(-.025em .1em 0px rgb(0 0 0))';

export const isMtgSymbolClass = (
  key: string
): key is keyof typeof mtgSymbolClasses => {
  return typeof (mtgSymbolClasses as Record<string, any>)[key] !== 'undefined';
};
