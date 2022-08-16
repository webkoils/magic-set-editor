module.exports = {
  extends: ['@mse/eslint-config/base'],

  rules: {
    '@next/next/no-html-link-for-pages': 0,
  },
  overrides: [require('@mse/eslint-config-scener/jest')],
};
