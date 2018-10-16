const webpack = require('webpack');
module.exports = {
  watch: true,
  target: 'electron-renderer',
  resolve: {
    extensions: ['*','.js', '.jsx']
  },
  entry: [
    './app/index.js'
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
              "@babel/plugin-transform-async-to-generator",
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
