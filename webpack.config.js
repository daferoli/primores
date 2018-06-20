const path = require("path");
const webpack = require("webpack");

const outputDirectory = "/dist";

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/app/app.jsx'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + outputDirectory,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist'
  }
};
