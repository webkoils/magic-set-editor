const withTM = require('next-transpile-modules')([
  '@mse/ui.card',
  '@mse/ui.core',

  '@mse/utils.card',
  '@mse/types',
  '@mse/sample-cards',
  '@mse/assets',
  // '@mse/templates',
]);

module.exports = withTM({
  reactStrictMode: false,
});
