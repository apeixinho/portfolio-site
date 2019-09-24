const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const htmlMinifier = require('html-minifier');

const loaderOptionsPluginConfig = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
  noInfo: true // set to false to see a list of every file being bundled.
});
const environmentPluginConfig = new webpack.EnvironmentPlugin({
  NODE_ENV: 'production',
  DEBUG: false,
});

const hashedModuleIdsPluginConfig = new webpack.HashedModuleIdsPlugin();

const miniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css',
  chunkFilename: '[id].[hash].css'
});

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'Portfolio website',
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
    minifyURLs: true
  },
  // Properties you define here are available in index.html
  // using htmlWebpackPlugin.options.varName
  // trackJSToken: 'INSERT YOUR TOKEN HERE'
});
const prodConfig = module.exports = {
  // devtool: 'hidden-source-map',
  target: 'web',
  // main: path.resolve(__dirname, 'src/index.js'),
  context: path.resolve(__dirname, 'src'),
  entry: [
    // 'font-awesome/scss/font-awesome.scss',
    './index.js',
    './ejs/index.ejs'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 4000,
      maxSize: 244000
    }
  },
  mode: "production",
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'eslint-loader',
          'babel-loader'
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // {
      //   test: /\.(scss|css)$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [{
      //         // translates CSS into CommonJS
      //         loader: 'css-loader',
      //         // options: {
      //           // minimize: true
      //           // sourceMap: true
      //         // }
      //       },
      //       {
      //         // compiles Sass to CSS
      //         loader: 'sass-loader',
      //         // options: {
      //         //   outputStyle: 'expanded',
      //         //   sourceMap: true,
      //         //   sourceMapContents: true
      //         // }
      //       }, {
      //         // Runs compiled CSS through postcss for vendor prefixing
      //         loader: 'postcss-loader',
      //         // options: {
      //           // minimize: true
      //         //   sourceMap: true
      //         // }
      //       },
      //     ],
      //     fallback: 'style-loader'
      //   }),
      // },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[contenthash].[ext]'
          }
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[contenthash].[ext]'
          }
        }]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/octet-stream',
            name: 'fonts/[name].[contenthash].[ext]'
          }
        }]
      },
      // {
      //   test: /\.(gif|png|jpe?g|svg)$/i,
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         bypassOnDebug: true, // webpack@1.x
      //         // disable: true, // webpack@2.x and newer
      //         name: '[name].[contenthash].[ext]',
      //         gifsicle: {
      //           enabled: false
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'image/svg+xml',
            name: 'fonts/[name].[contenthash].[ext]'
          }
        }]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            limit: 8192,
            fallback: 'responsive-loader',
            quality: 85
          }
        }]
      },
      { // font-awesome
        test: /font-awesome\.config\.js/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'font-awesome-loader'
          }
        ]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }
    ],
  },
  plugins: [
    environmentPluginConfig,
    loaderOptionsPluginConfig,
    hashedModuleIdsPluginConfig,
    new CopyWebpackPlugin([{
      from: 'docs/apeixinho-CV.pdf',
      to: '[name].[ext]',
      toType: 'template'
    }]),
    new CopyWebpackPlugin([{
      from: 'sitemap.xml',
      to: '[name].[ext]',
      toType: 'template'
    }]),
    new CopyWebpackPlugin([{
      from: 'robots.txt',
      to: '[name].[ext]',
      toType: 'template'
    }]),
    miniCssExtractPluginConfig,
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BrotliPlugin(),
    htmlWebpackPluginConfig
  ]
};

module.exports = prodConfig;
