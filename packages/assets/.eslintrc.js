module.exports = {
  extends: ['@mse/eslint-config/react'],
  settings: {
    next: {
      rootDir: ['./apps/*/', './packages/*/'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 0,
  },
  overrides: [
    require('@mse/eslint-config/jest'),
    require('@mse/eslint-config/storybook'),
  ],
};
