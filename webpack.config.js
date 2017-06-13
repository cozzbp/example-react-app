var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

var env = process.env.WEBPACK_ENV;
var CSS_FILENAME = (env === 'build') ? '[name].[chunkhash].css' : '[name].css';
var JS_FILENAME = (env === 'build') ? '[name].[chunkhash].js' : '[name].js';
var VENDOR_FILENAME = (env === 'build') ? 'vendor.[chunkhash].js' : 'vendor.js';

var config = {
  context: path.join(__dirname, "/src"),
  devtool: 'cheap-source-map',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Pragma,Cache-Control',
    }
  },
  entry: {
    main: ['babel-polyfill', './index.js'],
    vendor: ['babel-polyfill', 'react', 'react-dom', 'react-redux', 'react-router', 'redux'],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: JS_FILENAME
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        use: ['react-hot-loader', 'babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.s{0,1}css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
      },
      {
        test: /\.(ttf|eot|svg|woff)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|png|eot)$/,
        loader: 'url-loader?limit=25000'
      },
    ]
  },
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: VENDOR_FILENAME}),
    new ExtractTextPlugin(CSS_FILENAME),
    new CopyWebpackPlugin([
      {from: './index.html'},
      {from: './logo.svg'}
    ]),
    new ManifestPlugin()
  ]
}

module.exports = config;
