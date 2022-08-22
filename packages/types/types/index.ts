import {
  MAGIC_MANA_LARGE_SYMBOL_FONT_ASSETS,
  MAGIC_MANA_SMALL_SYMBOL_FONT_ASSETS,
} from '@mse/assets';

export type CardTextSymbol = {
  type: 'symbol';
  value: keyof typeof MAGIC_MANA_LARGE_SYMBOL_FONT_ASSETS &
    keyof typeof MAGIC_MANA_SMALL_SYMBOL_FONT_ASSETS;
};
export type CardTextString = { type: 'string'; value: string };
export type CardSymbolGroup = (CardTextString | CardTextSymbol)[];
export enum Color {
  WHITE = 'w',
  BLUE = 'u',
  BLACK = 'b',
  RED = 'r',
  GREEN = 'g',
  COLORLESS = 'c',
}
export enum CardComponentType {
  CARD = 'Card',
  BACKGROUND = 'Background',
  TOPLINE = 'Topline',
  NAME = 'Name',
  COST = 'Cost',
  TYPE = 'Type',
  PT = 'Pt',
  TEXTBOX = 'Textbox',
  SETSYMBOL = 'SetSymbol',
  RULESTEXT = 'Rulestext',
  FLAVORTEXT = 'Flavortext',
  ARTWORK = 'Artwork',
  TEXT_DIVIDER = 'TextDivider',
}

export interface CardIdentity {
  colors: Color[];
  identityColors: Color[];
  isLand: boolean;
  isHybrid: boolean;
}

export interface Card {
  id: string;
  num: number;
  name: string;
  supertype?: string;
  types: string[];
  subtypes?: string[];
  rulesText: string[];
  flavorText?: string;
  manaCost?: string;
  power?: number | string;
  toughness?: number | string;
  artworkSrc?: string;
  template: string;
  identity?: CardIdentity;
}

export interface CardComponentProps {
  card: Card;
}
export const isColor = (color: string): color is Color => {
  return Object.values(Color).includes(color as Color);
};

export const COLOR_SORT_ORDER: Record<Color, number> = {
  [Color.WHITE]: 1,
  [Color.BLUE]: 2,
  [Color.BLACK]: 3,
  [Color.RED]: 4,
  [Color.GREEN]: 5,
  [Color.COLORLESS]: 6,
};
