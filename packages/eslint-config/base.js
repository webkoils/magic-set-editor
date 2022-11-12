module.exports = {
  ignorePatters: ['.eslintrc.js', '**/node_modules/*.js'],

  extends: ['standard', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
};
