const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const config = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = webpackMerge(config, {
  mode: 'production',
  devtool: false,
  entry: {
    app: path.resolve(__dirname, '../src/client/App.tsx'),
  },
  output: {
    filename: 'js/[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[hash].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: true,
              sourceMap: true,
              localIdentName: '[folder]-[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
})
