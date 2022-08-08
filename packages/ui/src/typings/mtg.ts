import { templateMAGIC_MANA_SMALL_SYMBOL_FONT } from '@mse/assets/dist';

export namespace mtg {
  export type CardTextSymbol = {
    type: 'symbol';
    value: keyof typeof templateMAGIC_MANA_SMALL_SYMBOL_FONT;
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
    CARD,
    BACKGROUND,
    TOPLINE,
    NAME,
    COST,
    TYPE,
    PT,
    TEXTBOX,
    SETSYMBOL,
    RULESTEXT,
    FLAVORTEXT,
    ARTWORK,
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
  }

  export interface CardComponentProps {
    card: Card;
    style?: React.CSSProperties;
  }
}
