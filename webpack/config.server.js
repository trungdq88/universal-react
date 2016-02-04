var webpack = require('webpack');
var path = require('path');
var util = require('util');
var autoprefixer = require('autoprefixer');
var pkg = require('../package.json');

var loaders = require('./loaders');
var plugins = require('./plugins');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });
var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var jsBundle = 'app.js';

var entry = {
  server: ['./server.js'],
};

var config = {
  context: path.join(__dirname, '../src'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'node',
  devtool: false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: jsBundle,
    pathinfo: false
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      },
    ]
  },
  plugins: [
    //new webpack.IgnorePlugin(/\.(css|less)$/),
    //new webpack.BannerPlugin('require("source-map-support").install();',
    //  { raw: true, entryOnly: false })
  ],
  externals: nodeModules
};

module.exports = config;
