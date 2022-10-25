import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { manaSymbolMapping } from '../index';

const colors = ['W', 'U', 'B', 'R', 'G', 'C'] as const;
const variants = [
  { key: 'shadow', shadow: true },
  { key: 'default', shadow: false },
] as const;

export const staticSymbols = Object.fromEntries(
  colors.flatMap((c) => {
    return variants.map(({ key, ...props }) => {
      let Comp = manaSymbolMapping[c].component;
      return [
        c + `-` + key,
        renderToStaticMarkup(createElement(Comp, { ...props })),
      ];
    });
  })
);
console.log(staticSymbols);
