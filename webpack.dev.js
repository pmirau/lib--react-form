const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

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
    ],
  }
});
