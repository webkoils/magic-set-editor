module.exports = {
  root: true,
  extends: ['@mse/eslint-config/react'],

  rules: {
    '@next/next/no-html-link-for-pages': 0,
  },
  overrides: [
    require('@mse/eslint-config/jest'),
    require('@mse/eslint-config/storybook'),
  ],
};
