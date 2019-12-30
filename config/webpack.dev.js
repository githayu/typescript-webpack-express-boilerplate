const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const config = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = webpackMerge(config, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    app: ['webpack-hot-middleware/client', './src/client/App.tsx'],
  },
  output: {
    filename: 'js/[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
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
              minimize: false,
              sourceMap: true,
              localIdentName: '[folder]-[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
})
