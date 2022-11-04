import templateClasses, {
  CardTemplate,
  isCardTemplateClass,
  CardTemplateEntry,
  isMtgSymbolClass,
  isSymbolInputClass,
  isCardStateClass,
} from './cardTemplate';
import defaultTemplate from './defaultTheme';
import merge from 'ts-deepmerge';
import { CSSInterpolation, CSSObject } from '@emotion/css';

export const createTemplate = (template: CardTemplate) => {
  const mergedTemplate = merge({}, defaultTemplate, template);
  const cssObj: CSSInterpolation = {};
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
      }
    }
  }
  return cssObj;
};
