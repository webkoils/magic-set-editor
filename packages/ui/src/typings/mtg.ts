import {
  MAGIC_MANA_LARGE_SYMBOL_FONT_ASSETS,
  MAGIC_MANA_SMALL_SYMBOL_FONT_ASSETS,
} from '@mse/assets';

export namespace mtg {
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
    CARD = 'card',
    BACKGROUND = 'background',
    TOPLINE = 'topline',
    NAME = 'name',
    COST = 'cost',
    TYPE = 'type',
    PT = 'pt',
    TEXTBOX = 'textbox',
    SETSYMBOL = 'setSymbol',
    RULESTEXT = 'rulestext',
    FLAVORTEXT = 'flavortext',
    ARTWORK = 'artwork',
    TEXT_DIVIDER = 'textDivider',
  }

  export const COLOR_SORT: Record<Color, number> = {
    [Color.WHITE]: 1,
    [Color.BLUE]: 2,
    [Color.BLACK]: 3,
    [Color.RED]: 4,
    [Color.GREEN]: 5,
    [Color.COLORLESS]: 6,
  };

  export const sortColors = (colors: Color[]) => {
    return colors.slice().sort((a, b) => COLOR_SORT[a] - COLOR_SORT[b]);
  };

  export interface Card {
    id: string;
    num: number;
    name: string;
    supertype?: string;
    types: string[];
    subtypes?: string[];
    color: Color[];
    rulesText: string[];
    flavorText?: string;
    manaCost: string;
    power?: number | string;
    toughness?: number | string;
    artworkSrc?: string;
  }

  export interface CardComponentProps {
    card: Card;
  }
}
