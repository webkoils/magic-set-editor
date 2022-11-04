const { outputFileSync, readFileSync } = require('fs-extra');
const path = require('path');

(async function () {
  const svgContents = readFileSync(
    path.resolve(__dirname, '../svg/mtg-symbols.svg')
  ).toString('utf-8');

  outputFileSync(
    path.resolve(__dirname, '../src/symbol/mtg-symbols-svg.ts'),
    `export const mtgSymbols = \`${svgContents}\`;`
  );
})();
