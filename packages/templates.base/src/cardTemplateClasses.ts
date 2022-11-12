import {
  mtgSymbolClasses,
  MtgSymbolClasses,
  isMtgSymbolClass,
} from '@mse/symbols';
import {
  symbolInputClasses,
  SymbolInputClasses,
  isSymbolInputClass,
} from '@mse/symbol-input';

import type { CSSObject } from '@emotion/react';
const cardTemplateClasses = {
  root: 'MseCard',
  background: 'MseCardBackground',
  topLine: 'MseCardTopLine',
  name: 'MseCardName',
  cost: 'MseCardCost',
  typeLine: 'MseCardTypeLine',
  typeLineDivider: 'MseCardTypeLineDivider',
  setSymbol: 'MseCardSetSymbol',
  pt: 'MseCardPowerToughness',
  ptLabel: 'MseCardPowerToughnessLabel',
  ptDivider: 'MseCardPowerToughnessDivider',
  power: 'MseCardPower',
  toughness: 'MseCardToughness',
  artwork: 'MseCardArtwork',
  textBox: 'MseCardTextBox',

  rulesText: 'MseCardRulesText',
  flavorText: 'MseCardFlavorText',
  textBoxDivider: 'MseCardTextBoxDivider',
  hiddenField: 'MseCardHiddenField',
};
const cardStateClasses = {
  focused: 'MseCard-focused',
  disabled: 'MseCard-disabled',
  empty: 'MseCard-empty',
  readonly: 'MseCard-readonly',
  error: 'MseCard-error',
};

export type CardTemplateEntry = CSSObject & {
  symbol?: Partial<Record<keyof MtgSymbolClasses, CSSObject>>;
  input?: Partial<Record<keyof SymbolInputClasses, CSSObject>>;
  state?: Partial<Record<keyof typeof cardStateClasses, CSSObject>>;
};

export type CardTemplate = {
  id: string;
  components: Partial<
    Record<keyof typeof cardTemplateClasses, CardTemplateEntry>
  >;
};

const isCardTemplateClass = (
  key: string
): key is keyof typeof cardTemplateClasses => {
  return (
    typeof (cardTemplateClasses as Record<string, any>)[key] !== 'undefined'
  );
};

const isCardStateClass = (
  key: string
): key is keyof typeof cardStateClasses => {
  return typeof (cardStateClasses as Record<string, any>)[key] !== 'undefined';
};

export {
  isSymbolInputClass,
  isMtgSymbolClass,
  isCardTemplateClass,
  isCardStateClass,
};

export const templateClasses = {
  card: cardTemplateClasses,
  state: cardStateClasses,
  input: symbolInputClasses,
  symbol: mtgSymbolClasses,
};
export default templateClasses;
