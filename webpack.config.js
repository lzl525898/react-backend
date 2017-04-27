// JavaScript Document
const webpack = require('webpack');
const path = require('path');

const config = {
  devServer: {
    host: 'localhost',
    port: process.env.PORT || 8080
  },
  context: path.resolve(__dirname, 'src'),
  entry: './js/root.js',
  module: {
	loaders: [
    {
	    test: /\.js?$/,
		  exclude: /(node_modules)/,
		  loader: 'babel-loader',
		  query: {
		      presets: ['react', 'es2015'],
		  }
    },
    {
        test: /\.css?$/,
        loader: 'style-loader!css-loader'
    },
    {
        test: /\.less$/,
        loader: 'style!css!less'
    }
   ]
  },
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'index.js'
  }
};

module.exports = config;
