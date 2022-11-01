const withTM = require('next-transpile-modules')([
  '@mse/ui.card',
  '@mse/ui.core',

  '@mse/utils.card',
  '@mse/types',
  '@mse/sample-cards',
  '@mse/assets',
  '@mse/symbols',
  // '@mse/templates',
]);
const withPWA = require('next-pwa');
module.exports = withTM(
  withPWA({
    reactStrictMode: true,
    pwa: {
      dest: 'public',
    },
  })
);
