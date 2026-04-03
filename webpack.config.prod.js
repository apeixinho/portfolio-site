const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: ['./index.js', './ejs/index.ejs'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: false,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
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
          filename: 'fonts/[name].[contenthash][ext]',
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
          filename: '[name].[contenthash][ext]',
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
      NODE_ENV: 'production',
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
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg|xml|txt|json)$/,
      threshold: 8192,
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      compressionOptions: {
        level: 11,
      },
      test: /\.(js|css|html|svg|xml|txt|json)$/,
      threshold: 8192,
      minRatio: 0.8,
    }),
    new HtmlWebpackPlugin({
      title: 'My Portfolio',
      template: './ejs/index.ejs',
      favicon: './images/favicon.ico',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};
