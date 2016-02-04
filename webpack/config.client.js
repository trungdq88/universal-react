var path = require('path');
var util = require('util');
var autoprefixer = require('autoprefixer');
var pkg = require('../package.json');

var loaders = require('./loaders');
var plugins = require('./plugins');

var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));

var entry = {
  client: ['./client.jsx'],
};

if (DEBUG) {
  entry.client.push(
    util.format(
      'webpack-dev-server/client?http://%s:%d',
      pkg.config.devHost,
      pkg.config.devPort
    )
  );
  entry.client.push('webpack/hot/dev-server');
}

var config = {
  context: path.join(__dirname, '../src'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG || TEST ? 'inline-source-map' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir + '/client'),
    publicPath: '/',
    filename: jsBundle,
    pathinfo: false
  },
  module: {
    loaders: loaders
  },
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    modulesDirectories: [
      'src/client',
      'node_modules'
    ],
    extensions: ['', '.jsx', '.json', '.js']
  },
  devServer: {
    contentBase: path.resolve(pkg.config.buildDir + '/client'),
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    noInfo: false,
    inline: true,
    stats: { colors: true },
    proxy: {
      "*": "http://localhost:" + pkg.config.apiPort,
    },
  },
};

module.exports = config;
