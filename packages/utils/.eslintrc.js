module.exports = {
  extends: ['@scener/eslint-config/base'],

  rules: {
    '@next/next/no-html-link-for-pages': 0,
  },
  overrides: [require('@scener/eslint-config-scener/jest')],
};
