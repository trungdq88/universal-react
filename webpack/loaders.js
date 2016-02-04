var path = require('path');
var pkg = require('../package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENV = process.env.NODE_ENV || 'production';
var BUILD_NUMBER = process.env.BUILD_NUMBER || '(non-jenkins-build)';

var fileLoader = 'file-loader?name=assets/[name].[ext]';
var sassLoader;
var cssLoader;
var jsxLoader;
var htmlLoader = [
  'file-loader?name=[name].[ext]',
  'template-html-loader?' + [
    'raw=true',
    'engine=lodash',
    'version=' + pkg.version,
    'title=' + pkg.name,
    'environment=' + ENV,
    'build=' + BUILD_NUMBER,
  ].join('&')
].join('!');
var sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, '../app/scss'),
  'includePaths[]=' + path.resolve(__dirname, '../node_modules')
];
if (ENV === 'development' || ENV === 'test') {
  jsxLoader = [];
  if (ENV !== 'test') {
    jsxLoader.push('react-hot');
  }
  jsxLoader.push('babel');
  sassParams.push('sourceMap', 'sourceMapContents=true');
  sassLoader = [
    'style-loader',
    'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
  ].join('!');
  cssLoader = [
    'style-loader',
    'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
    'postcss-loader'
  ].join('!');
} else {
  jsxLoader = ['babel'];
  sassLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader?modules&localIdentName=[hash:base64:5]',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
  ].join('!'));
  cssLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader?modules&localIdentName=[hash:base64:5]',
    'postcss-loader'
  ].join('!'));
}

var loaders = [
  { test: /\.json$/, loader: "json-loader" },
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loaders: jsxLoader /* 'babel' */
  },
  { test: /\.css$/, loader: cssLoader /* "style-loader!css-loader" */ },
  { test: /\.png$/, loader: "url-loader?limit=100000" },
  {
    test: /\.html$/,
    loader: htmlLoader
  },
  {
    test: /(\.jpe?g|\.gif|\.png|\.ico)/,
    loader: fileLoader
  },
  { test: /\.eot(\?\S*)?/, loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject' },
  { test: /\.woff2(\?\S*)?/, loader: 'url-loader?limit=100000&mimetype=application/font-woff2' },
  { test: /\.woff(\?\S*)?/, loader: 'url-loader?limit=100000&mimetype=application/font-woff' },
  { test: /\.ttf(\?\S*)?/, loader: 'url-loader?limit=100000&mimetype=application/font-ttf' },
  { test: /\.svg(\?\S*)?/, loader: 'url-loader?limit=100000&mimetype=application/font-svg' },
  {
    test: /\.scss$/,
    loader: sassLoader
  },
];
module.exports = loaders;
