import { CardTemplate } from '@mse/types';
import { build } from 'esbuild';
import m15Template from './template';
import { pascalCase } from 'change-case';
import { CSSProperties } from 'react';
import * as postcssJs from 'postcss-js';
import autoprefixer from 'autoprefixer';

const prefixer = postcssJs.sync([autoprefixer]);

import postcss from 'postcss';
import { outputFileSync } from 'fs-extra';

const generateName = (...args: string[]) => {
  return 'Mse' + args.map((a) => pascalCase(a)).join('-');
};

const styleObjectToString = (obj: CSSProperties) => {
  return postcss()
    .process(prefixer(obj), { parser: postcssJs as any })
    .then((result) => result.css);
};

const createCssFile = (template: CardTemplate) => {
  const parentClassName = generateName(template.id);
  return Promise.all(
    Object.entries(template.components).flatMap(([key, slots]) => {
      return Object.entries(slots).map(([slot, styles]) => {
        let className = generateName(key, slot);
        return styleObjectToString(styles).then((css) =>
          css ? `.${parentClassName} .${className} {${css}}` : ``
        );
      });
    })
  );
};

const createTsFile = (template: CardTemplate) => {
  const parentClassName = generateName(template.id);
  return `export const templateClasses = 
   ${JSON.stringify({
     root: parentClassName,
     ...Object.fromEntries(
       Object.entries(template.components).map(([key, slots]) => {
         return [
           key,
           Object.fromEntries(
             Object.entries(slots).map(([slot, styles]) => {
               let className = generateName(key, slot);
               return [slot, className] as [string, string];
             })
           ),
         ];
       })
     ),
   })}`;
};
const buildTemplateBundle = async () => {
  const cssFile = await createCssFile(m15Template);
  const tsFile = await createTsFile(m15Template);

  outputFileSync(`./${m15Template.id}.css`, cssFile.join('\n'));
  outputFileSync(
    `./${m15Template.id}.css.ts`,
    `export const templateCss = \`${cssFile.join('\n')}\``
  );

  outputFileSync(`./${m15Template.id}Classes.ts`, tsFile);

  /*  build({
    stdin: { contents:, resolveDir: './', loader: 'ts' },
  });*/
};

buildTemplateBundle();
