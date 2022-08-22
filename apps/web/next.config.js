const withTM = require('next-transpile-modules')([
  '@mse/ui',
  '@mse/utils',
  '@mse/types',
  '@mse/sample-cards',
  '@mse/assets',
  //'@mse/templates',
]);

module.exports = withTM({
  reactStrictMode: false,
});
