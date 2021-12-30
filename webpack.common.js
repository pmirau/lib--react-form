const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'umd',
    },
    globalObject: 'this',
    clean: true,
  },
  plugins: [new MiniCssExtractPlugin()],
  externals: {
    'classnames': 'classnames',
    'deep-equal': 'deep-equal',
    'joi': 'joi',
    'prop-types': 'prop-types',
    'react': 'react',
    'react-test-renderer': 'react-test-renderer',
  },
};
