module.exports = {
  extends: ['@mse/eslint-config/react'],

  rules: {
    '@next/next/no-html-link-for-pages': 0,
  },
  overrides: [
    require('@mse/eslint-config-scener/jest'),
    require('@mse/eslint-config-scener/storybook'),
  ],
};
