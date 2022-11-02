import { CardTemplate } from './template';
import m15Template from './template';
import { CSSProperties } from 'react';
import * as postcssJs from 'postcss-js';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';
import postcss from 'postcss';
import { build } from 'esbuild';
import { copyFileSync, outputFileSync } from 'fs-extra';
const prefixer = postcssJs.sync([autoprefixer]);

const styleObjectToString = (obj: CSSProperties) => {
  return postcss()
    .process(obj, {
      parser: postcssJs as any,
      from: undefined,
      to: undefined,
    })

    .then((result) => result.css);
};

const createCssFile = (template: CardTemplate) => {
  const parentClassName = 'MseTemplate' + template.id;
  return Promise.all(
    Object.entries(template.components).flatMap(([key, styles]) => {
      return styleObjectToString(styles).then((css) =>
        css ? `.${parentClassName} .${key} {${css}}` : ``
      );
    })
  );
};

const buildTemplateBundle = async () => {
  const cssFile = await createCssFile(m15Template);
  let cssContent = await postcss([
    postcssNested(),
    cssnano({ preset: 'default' }),
  ])
    .process(cssFile.join('\n'))
    .then((result) => {
      return result.css;
    });
  outputFileSync(`./template.min.css`, cssContent);
  outputFileSync(
    `./templateCss.ts`,
    `export const templateCss = \`${cssContent}\``
  );
};

buildTemplateBundle();
