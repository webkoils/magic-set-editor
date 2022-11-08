import templateClasses, {
  CardTemplate,
  isCardTemplateClass,
  CardTemplateEntry,
  isMtgSymbolClass,
  isSymbolInputClass,
  isCardStateClass,
} from './cardTemplateClasses';
import { defaultTemplate } from './defaultTemplate';
import merge from 'ts-deepmerge';
import { CSSObject } from '@emotion/react';
export interface TemplateMapping {
  rootClassName: string;
  styles: CSSObject;
}
export const createTemplate = (
  template: { id: string } & Partial<CardTemplate>
): TemplateMapping => {
  const mergedTemplate = merge({}, defaultTemplate, template);
  const cssObj: CSSObject = {};
  Object.entries(mergedTemplate.components).forEach(([classKey, classObj]) => {
    if (isCardTemplateClass(classKey)) {
      cssObj[`& .${templateClasses.card[classKey]}`] = transformTemplateObject(
        classObj
      );
    }
  });
  return {
    rootClassName: `MseTemplate${template.id}`,
    styles: cssObj,
  };
};

export const transformTemplateObject = (obj: CardTemplateEntry) => {
  const { symbol, input, state, ...rest } = obj;
  const cssObj: CSSObject = { ...rest };
  if (symbol) {
    for (let k in symbol) {
      if (isMtgSymbolClass(k)) {
        let styles = symbol[k];
        if (typeof styles !== 'undefined') {
          cssObj[`& .${templateClasses.symbol[k]}`] = styles;
        }
      } else if (k.indexOf('!') === 0) {
        let notK = k.slice(1);
        if (isMtgSymbolClass(notK)) {
          let styles = symbol[notK];
          if (typeof styles !== 'undefined') {
            cssObj[
              `& .${templateClasses.symbol.root}:not(.${templateClasses.symbol[notK]})`
            ] = styles;
          }
        }
      }
    }
  }
  if (input) {
    for (let k in input) {
      if (isSymbolInputClass(k)) {
        let styles = input[k];
        if (typeof styles !== 'undefined') {
          cssObj[`& .${templateClasses.input[k]}`] = styles;
        }
      } else if (k.indexOf('!') === 0) {
        let notK = k.slice(1);
        if (isSymbolInputClass(notK)) {
          let styles = input[notK];
          if (typeof styles !== 'undefined') {
            cssObj[
              `& .${templateClasses.input.root}:not(.${templateClasses.input[notK]})`
            ] = styles;
          }
        }
      }
    }
  }
  if (state) {
    for (let k in state) {
      if (isCardStateClass(k)) {
        let styles = state[k];
        if (typeof styles !== 'undefined') {
          cssObj[`&.${templateClasses.state[k]}`] = styles;
        }
      } else if (k.indexOf('!') === 0) {
        let notK = k.slice(1);
        if (isCardStateClass(notK)) {
          let styles = state[notK];
          if (typeof styles !== 'undefined') {
            cssObj[`&:not(.${templateClasses.state[notK]})`] = styles;
          }
        }
      }
    }
  }
  return cssObj;
};
