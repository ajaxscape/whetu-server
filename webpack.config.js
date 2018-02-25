const path = require('path')
const webpack = require('webpack')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const {ifDevelopment, ifProduction} = getIfUtils(nodeEnv)

module.exports = removeEmpty({
  entry: {
    multi: './src/client/multi-player.js',
    single: './src/client/single-player.js',
    'single-ww': './src/client/single-ww-player.js',
    css: './src/client/index.scss'
  },

  output: {
    filename: ifProduction('whetu-[name].[hash].js', 'whetu-[name].js'),
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {url: false}
          }, 'sass-loader']
        })
      },
      {
        test: /\.js/,
        use: ['babel-loader?cacheDirectory'],
        include: [/src\/client/, /node_modules/],
        exclude: /node_modules\/(?!whetu-engine|!whetu-render|!query-string)/
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            name: ifProduction('whetu-engine.[hash].js', 'whetu-engine.js')
          }
        }
      }
    ]
  },

  devtool: 'eval-source-map',

  devServer: ifDevelopment({
    host: '0.0.0.0',
    port: 3000,
    stats: 'normal'
  }),

  plugins: removeEmpty([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),

    new CopyWebpackPlugin([{from: 'src/client/assets', to: 'assets'}]),

    ifProduction(
      new ExtractTextPlugin('whetu-[name].[hash].css'),
      new ExtractTextPlugin('whetu-[name].css')
    )
  ]),

  node: {
    fs: 'empty'
  }
})
