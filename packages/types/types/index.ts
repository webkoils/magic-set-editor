import React from 'react';

export type MseCardTextSymbol = {
  type: 'symbol';
  value: React.ComponentType<any>;
  match?: string;
};
export type MseCardTextString = { type: 'text'; value: string };
export type MseCardSymbolGroup = (MseCardTextString | MseCardTextSymbol)[];
export enum MseColor {
  WHITE = 'W',
  BLUE = 'U',
  BLACK = 'B',
  RED = 'R',
  GREEN = 'G',
  COLORLESS = 'C',
}
export enum MseCardComponentType {
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

export interface MseCardIdentity {
  colors: MseColor[];
  identityColors: MseColor[];
  isLand: boolean;
  isHybrid: boolean;
}

export interface MseCard {
  id: string;
  num: number;
  name: string;
  supertype?: string;
  types: string[];
  subtypes?: string[];
  rulesText: string;
  flavorText?: string;
  manaCost?: string;
  power?: number | string;
  toughness?: number | string;
  artworkSrc?: string;
  template: string;
  identity?: MseCardIdentity;
}
export type MseCardPropertyKey = keyof MseCard;
export interface MseCardComponentProps {
  card?: MseCard;
}
export const isColor = (color: string): color is MseColor => {
  return !!color && Object.values(MseColor).includes(color as MseColor);
};

export const MSE_COLOR_SORT_ORDER: Record<MseColor, number> = {
  [MseColor.WHITE]: 1,
  [MseColor.BLUE]: 2,
  [MseColor.BLACK]: 3,
  [MseColor.RED]: 4,
  [MseColor.GREEN]: 5,
  [MseColor.COLORLESS]: 6,
};

export function isPropertyOfType<T extends Record<string, any>>(
  object: T,
  key: string
): key is keyof MseCard {
  return (object as T)[key];
}
export * from './symbols';
