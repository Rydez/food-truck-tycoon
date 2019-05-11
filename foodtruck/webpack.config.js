const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  context: __dirname,

  entry: './game/js/app',

  output: {
      path: path.resolve('./foodtruck/build/'),
      filename: '[name]-bundle.js',
      hotUpdateChunkFilename: './hot/hot-update.js',
      hotUpdateMainFilename: './hot/hot-update.json'
  },

  plugins: [
    new webpack.ProvidePlugin({ riot: 'riot' }),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [{
      test: /\.tag$/,
      exclude: /node_modules/,
      use: [{
        loader: 'riot-tag-loader',
        options: {
          template: 'pug',
          hot: true,
          debug: true
        }
      }]
    }, {
      test: /\.styl$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'stylus-loader']
    }]
  },

  resolve: {
    alias: {
      'pixi': path.join(__dirname, 'node_modules/pixi.js/dist/pixi.min.js'),
      '@pixi': path.join(__dirname, 'node_modules/@pixi'),
      'riot': path.join(__dirname, 'node_modules/riot/riot.min.js'),
      'event-emitter': path.join(__dirname, 'node_modules/eventemitter3/umd/eventemitter3.min.js'),
    }
  }
}
