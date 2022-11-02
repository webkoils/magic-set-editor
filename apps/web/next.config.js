const withTM = require('next-transpile-modules')([
  '@mse/ui.card',
  '@mse/ui.core',

  '@mse/utils.card',
  '@mse/types',
  '@mse/sample-cards',
  '@mse/assets',
  '@mse/symbols',
  '@mse/templates.m15',
  '@mse/symbol-input',
]);
// const withPWA = require('next-pwa');
/**
 * @type {import('next').NextConfig}
 */
module.exports = withTM({
  reactStrictMode: true,
});
