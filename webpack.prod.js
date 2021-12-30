const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      {
        test: /\.s?css$/i,
        // See https://github.com/vercel/next.js/discussions/14060#discussioncomment-27889
        // for the reason to not use style-loader.
        // Consider using https://github.com/kriasoft/isomorphic-style-loader
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ],
  }
});
