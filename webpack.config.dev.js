const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: ['./index.js', './ejs/index.ejs'],
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: false,
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(woff2?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              api: 'modern',
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, 'src/styles'),
                  path.resolve(__dirname, 'node_modules'),
                ],
              },
            },
          },
        ],
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
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader',
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: 'false',
    }),
    new ESLintPlugin({
      extensions: ['js'],
      context: path.resolve(__dirname, 'src'),
      failOnError: false,
      failOnWarning: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/docs/apeixinhoCV.pdf'),
          to: '[name][ext]',
          noErrorOnMissing: false,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      title: 'homepage',
      template: './ejs/index.ejs',
      favicon: './images/favicon.ico',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  stats: {
    colors: true,
  },
};
