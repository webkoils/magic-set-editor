module.exports = {
  extends: ['@scener/eslint-config/react'],
  settings: {
    next: {
      rootDir: ['./apps/*/', './packages/*/'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 0,
  },
  overrides: [
    require('@scener/eslint-config-scener/jest'),
    require('@scener/eslint-config-scener/storybook'),
  ],
};
