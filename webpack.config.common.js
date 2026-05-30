const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: ['./index.js', './ejs/index.ejs'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
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
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader',
      },
    ],
  },
  plugins: [
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
        {
          from: path.resolve(__dirname, 'src/sitemap.xml'),
          to: '[name][ext]',
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'src/robots.txt'),
          to: '[name][ext]',
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'src/site.webmanifest'),
          to: '[name][ext]',
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  stats: {
    colors: true,
  },
};
