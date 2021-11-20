const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/bootstrap.jsx',
  output: {
    filename: 'spelunker-[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.EnvironmentPlugin([
      'API_URI',
      'DEBUG',
      'PIPELINE_URI',
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.styl$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'stylus-loader',
        ],
      },
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: process.env.WEB_PORT,
  },
  devtool: 'cheap-source-map',
};
