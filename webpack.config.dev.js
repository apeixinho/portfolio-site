const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const GoogleFontsPlugin = require("google-fonts-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const loaderOptionsPluginConfig = new webpack.LoaderOptionsPlugin({
  minimize: false,
  debug: true,
  noInfo: false // set to false to see a list of every file being bundled.

});

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'homepage',
  template: './ejs/index.ejs',
  favicon: './images/favicon.ico',
  inject: true
});

const environmentPluginConfig = new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  DEBUG: false,
});

const miniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css'
});

const copyWebpackPluginConfig = new CopyWebpackPlugin([{
  from: 'docs/apeixinho-CV.pdf',
  to: '[name].[ext]',
  toType: 'template'
}]);

const devConfig = module.exports = {
  // devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // directory or URL to serve HTML content from.
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    port: 4000,
    compress: true, // enable gzip compression
    open: true, // open default browser while launching
    inline: true, // inline mode (set to false to disable including client scripts (like livereload)
    hot: true,
    disableHostCheck: true,
    stats: {
      colors: true
    }
  },
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: [
    //'font-awesome/scss/font-awesome.scss',
    './index.js',
    './ejs/index.ejs'
  ],
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
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
      //         loader: "css-loader",
      //         options: {
      //           sourceMap: true
      //         }
      //       },
      //       {
      //         // compiles Sass to CSS
      //         loader: "sass-loader",
      //         options: {
      //           outputStyle: 'expanded',
      //           sourceMap: true,
      //           sourceMapContents: true
      //         }
      //       }
      //       // Please note we are not running postcss here
      //     ],
      //     fallback: 'style-loader'
      //   })
      // },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
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
            name: 'fonts/[name].[ext]',
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
            name: 'fonts/[name].[ext]',
          }
        }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'image/svg+xml',
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            // On development we want to see where the file is coming from, hence we preserve the [path]
            name: '[path][name].[ext]?hash=[hash:20]',
            limit: 8192,
            fallback: 'responsive-loader',
            quality: 85
          }
        }]
      },
      // font-awesome
      {
        test: /font-awesome\.config\.js/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'font-awesome-loader'
          }
        ]
      }, {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }
    ],
  },
  plugins: [
    environmentPluginConfig,
    loaderOptionsPluginConfig,
    copyWebpackPluginConfig,
    // new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    // }),
    // new GoogleFontsPlugin({
    //   fonts: [{
    //       family: "PT Sans"
    //     }, {
    //       family: "Open Sans"
    //     },
    //     {
    //       family: "Roboto",
    //       variants: ["400", "700italic"]
    //     },
    //     {
    //       family: "Ubuntu"
    //     },
    //   ],
    //   path: "fonts/",
    //   filename: "fonts/fonts.css"
    // }),
    // new ExtractTextPlugin('styles.css', {
    //   allChunks: true
    // }),
    miniCssExtractPluginConfig,
    htmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = devConfig;
