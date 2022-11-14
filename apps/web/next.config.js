const withTM = require('next-transpile-modules')([
  '@mse/ui.core',
  '@mse/ui.card',
  '@mse/utils.ssr',
  '@mse/utils.card',
  '@mse/utils.symbol-renderer',
  '@mse/utils.autosizer',
  '@mse/types',
  '@mse/sample-cards',
  '@mse/assets',
  '@mse/symbols',
  '@mse/symbol-input',
  '@mse/templates.base',
]);
const withPWA = require('next-pwa');
/**
 * @type {import('next').NextConfig}
 */
module.exports = withPWA({ dest: 'public' })(
  withTM({
    reactStrictMode: true,
  })
);
