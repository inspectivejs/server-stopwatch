<<<<<<< HEAD
const webpack = require('webpack');
module.exports = {
  watch: true,
  target: 'electron-renderer',
  resolve: {
    extensions: ['*','.js', '.jsx']
  },
  entry: [
    './app/index.jsx'
  ],
  output: {
    path: __dirname + '/js',
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, 
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              "babel-plugin-transform-class-properties",
              "transform-react-jsx"
            ],
            presets: ["@babel/preset-env"]
          }
        } 
      }
    ]
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', ['electron'])
  ]
};
=======
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  watch: true,
  target: 'electron-renderer',
  entry: './app/src/renderer_process.js',
  output: {
    path: __dirname + '/app/build',
    publicPath: 'build/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['react'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: {
            modules: true,
          },
        }),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
}
>>>>>>> 0234e6c7aeef75b3bc8dae39008d8e259b885185
