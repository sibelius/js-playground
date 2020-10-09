const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv-webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  mode: 'production',
  context: path.resolve(cwd, './'),
  entry: ['./src/index.tsx'],
  output: {
    path: path.join(cwd, 'build'),
    publicPath: '/',
    pathinfo: false,
    // https://github.com/webpack/webpack/pull/8642
    futureEmitAssets: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: [/node_modules/],
        use: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|pdf|csv|xlsx|ttf|woff(2)?)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new dotEnv({
      path: './.env',
      safe: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MonacoWebpackPlugin({
      languages: [
        'markdown',
        'javascript',
        'typescript',
        'css',
        'json',
        'shell',
        'html',
      ],
    }),
  ],
};
