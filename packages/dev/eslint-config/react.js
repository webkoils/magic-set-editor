module.exports = {
  extends: [
    'standard',
    'standard-jsx',
    'next',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['@typescript-eslint', '@emotion'],
  parser: '@typescript-eslint/parser',
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    '@next/next/no-img-element': 0,
    '@next/next/no-html-link-for-pages': [2, '.'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    // 'react/jsx-curly-brace-presence': [true, 'always'],
  },
};
