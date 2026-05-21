const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(woff2?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|ico|webp|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192,
          },
        },
        generator: {
          filename: '[path][name][ext]',
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    port: 4000,
    compress: true,
    hot: true,
    open: true,
    client: {
      overlay: true,
    },
    allowedHosts: 'all',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: 'false',
    }),
    new HtmlWebpackPlugin({
      title: 'homepage',
      template: './ejs/index.ejs',
      favicon: './images/favicon.ico',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
