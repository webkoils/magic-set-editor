// .storybook/main.js
const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../stories/*.story.@(js|jsx|ts|tsx)'],
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
    /*  config.module.rules.push({
      test: /\.(png|svg|jpg)$/,
      use: [
        {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });*/
    return config;
  },
};
