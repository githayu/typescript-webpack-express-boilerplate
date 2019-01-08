const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlgin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist/public'),
    chunkFilename: 'js/[id].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
    alias: {
      '~/client': path.resolve(__dirname, '../src/client'),
      '~/server': path.resolve(__dirname, '../src/server'),
      '~/types': path.resolve(__dirname, '../src/types'),
      '~/static': path.resolve(__dirname, '../src/static'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              'react-hot-loader/babel',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlgin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/client/index.html'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public/'),
        toType: 'dir',
      },
    ]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
