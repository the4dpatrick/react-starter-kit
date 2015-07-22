const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const sassLoaders = [
  "css-loader",
  "autoprefixer-loader?browsers=last 2 version",
  "sass-loader?includePaths[]=" + path.resolve(__dirname, "./app"),
];

var production = process.env.NODE_ENV === 'production';

var config = {
  entry: [
    './app/index',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + 'public/js',
    publicPath: "/"
  },
  plugins: [
    new ExtractTextPlugin("../stylesheets/app.css"),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', 'scss'],
    modulesDirectories: ['src', 'node_modules'],
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loaders: ['jsx?harmony', 'babel-loader'],
        exclude: /node_modules/ 
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      {
        test: /\.svg/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!")),
      },
      { 
        test: /\.(otf|woff|woff2|eot|ttf)$/, 
        loader: 'url-loader' 
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

if (!production) {
  config.watch = true;
}

module.exports = config;