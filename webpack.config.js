// Packages
var path = require('path'),
    webpack = require('webpack'),
    glob = require('glob'),
    env = require('yargs').argv.mode,
    resolveUrl = require('resolve-url-loader');

var settings = {
  build: {
    config: 'build.config.js',
    output: './build',
    devtool: true,
    debug: true
  },
  'dev': {
    config: 'dev.config.js',
    output: './build',
    devtool: false,
    debug: true
  }
}

// Get All config settings for current mode.
var configObj = settings[env]
var configFile = require('./config/' + configObj.config)

module.exports = {
  cache: true,
  entry: './app/scripts/index.js',
  output: {
    path: configObj.output,
    publicPath: typeof configObj.publicPath !== 'undefined' ? configObj.publicPath : false,
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: configFile.loaders,
    exprContextCritical: false
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './assets')]
  },
  sasslint: {
    emitError: true
  },
  node: {
    fs: 'empty' // avoids error messages
  },
  resolve: {
    modulesDirectories: ['node_modules', 'app'],
    extension: ['', '.js', '.scss', '.html', '.png', '.jpg', '.svg', '.mp4']
  },
  debug: configObj.debug,
  devtool: configObj.devtool ? 'eval' : false,
  plugins: configFile.plugins
};
