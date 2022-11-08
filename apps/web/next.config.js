const withTM = require('next-transpile-modules')([
  '@mse/ui',

  '@mse/utils',
  '@mse/types',
  '@mse/sample-cards',
  '@mse/assets',
  '@mse/ui.symbols',
  '@mse/ui.symbol-input',
  '@mse/templates.base',
  '@mse/supabase',
]);
// const withPWA = require('next-pwa');
/**
 * @type {import('next').NextConfig}
 */
module.exports = withTM({
  reactStrictMode: true,
});
