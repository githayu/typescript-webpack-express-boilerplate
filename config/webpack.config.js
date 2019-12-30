const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  output: {
    path: path.join(__dirname, '../dist/public'),
    chunkFilename: 'js/[id].chunk.js',
    publicPath: '/',
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    plugins: [new TsconfigPathsPlugin()],
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
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  targets: { browsers: 'last 2 versions' },
                },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              'react-hot-loader/babel',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['../../dist/**/*'],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src/client/index.html'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve('public/'),
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
