const path = require('path');
const webpack = require('webpack');


const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//const isDev = process.env.NODE_ENV === 'development';
//const isProd = !isDev;
/*
const optimization = () => {
  const config = {
      splitChunks: {
      chunks: 'all',
    }
  }
  return config;
}
*/


module.exports = (env, options) => {
  const isProd = options.mode ==='production';

  const config = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    watch: !isProd,
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'script.js'
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader','sass-loader',]
        },
        {
          test: /\.(png|jpe?g|svg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          use: ['file-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),

    ]
    
  }

  return config;
}
/*
{

  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
  },
  output: {
    filename: '[name].[id].js',
    path: path.resolve(__dirname, 'dist'),
  }, 
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@moduls': path.resolve(__dirname, 'src/moduls'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      title: 'gem-puzzle',
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    /*
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    
  ],
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: ['style-loader', 'css-loader','sass-loader',]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
    ]
  }
}
*/