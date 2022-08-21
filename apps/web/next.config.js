const withTM = require('next-transpile-modules')([
  '@mse/ui',
  '@mse/utils',
  '@mse/types',
]);

module.exports = withTM({
  reactStrictMode: false,
});
