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
  costColors: MseColor[];
  isLand: boolean;
  isHybrid: boolean;
}

export interface MseCard {
  id: string;
  name: string;
  types: string;
  subtypes?: string;
  rulesText?: string;
  flavorText?: string;
  manaCost?: string;
  power?: string;
  toughness?: string;
  artworkUrl?: string;
  templateId: string;
  cardSetId?: string;
  collectorNumber?: number;
  userId: string;
  identity?: MseCardIdentity;
  createdAt?: string;

  updatedAt?: string;
}

export interface MseCardSet {
  id: string;
  displayName: string;
  userId: string;
  slug: string;
  createdAt?: string;

  updatedAt?: string;
}
export interface MseCardSetWithCards extends MseCardSet {
  cards?: MseCard[];
}

export type MseCardPropertyKey = keyof MseCard;
export interface MseCardComponentProps {
  card?: MseCard;
}
export const isColor = (color: string): color is MseColor => {
  return !!color && Object.values(MseColor).includes(color as MseColor);
};

export const MSE_COLOR_SORT_ORDER: Record<MseColor, number> = {
  [MseColor.COLORLESS]: 0,

  [MseColor.WHITE]: 1,
  [MseColor.BLUE]: 2,
  [MseColor.BLACK]: 3,
  [MseColor.RED]: 4,
  [MseColor.GREEN]: 5,
};

export function isPropertyOfType<T extends Record<string, any>>(
  object: T,
  key: string
): key is keyof MseCard {
  return (object as T)[key];
}
