const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/bootstrap.jsx',
  output: {
    filename: 'static/js/[name]-[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    fallback: {
      fs: false,
    },
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
      'DATA_URI',
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'static/img/[name]-[contenthash][ext][query]',
        },
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
