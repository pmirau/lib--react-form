const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        // consider options.projectReferences for ts-loader
        use: ['babel-loader', 'ts-loader'],
        resolve: {
          extensions: ['.ts', '.tsx'],
        },
      },
      {
        test: /\.s?css$/i,
        // See https://github.com/vercel/next.js/discussions/14060#discussioncomment-27889
        // for the reason to not use style-loader.
        // Consider using https://github.com/kriasoft/isomorphic-style-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local][[hash:base64:5]]'
              },
            },
          },
          'sass-loader',
        ],
      }
    ],
  }
});
