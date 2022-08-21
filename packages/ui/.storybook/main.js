// .storybook/main.js
const { outputFileSync } = require('fs-extra');
const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../**/*.story.mdx', '../**/*.story.@(js|jsx|ts|tsx)'],
  staticDirs: [
    '../node_modules/@mse/assets/dist',
    '../node_modules/@mse/assets/fonts',
  ],
  core: {
    builder: 'webpack5',
  },

  addons: ['@storybook/addon-essentials', '@storybook/addon-postcss'],
  features: {
    emotionAlias: false,
    modernInlineRendering: true,
  },
  framework: '@storybook/react',
  babel: async (options) => {
    //outputFileSync(process.cwd() + '/babel.json', JSON.stringify(options));

    return {
      ...options,

      presets: [
        ...options.presets,
        [
          '@babel/react',
          { runtime: 'automatic', importSource: '@emotion/react' },
        ],
      ],
      plugins: [...options.plugins, '@emotion/babel-plugin'],

      // any extra options you want to set
    };
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': toPath('node_modules/@emotion/react'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    };

    return config;
  },
};
