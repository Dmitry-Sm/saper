const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: 'dist/'
}

const style_loader = {
  test: /\.scss$/,
  use: [
      "style-loader", // creates style nodes from JS strings
      "css-loader", // translates CSS into CommonJS
      "sass-loader" // compiles Sass to CSS, using Node Sass by default
  ]
}

const file_loader = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    "file-loader",
    {
      loader: "image-webpack-loader",
      options: {
        disable: true
      }
    }
  ]
}


const rules = [
  style_loader,
  file_loader
]

const plugins = [
]

module.exports = {
  entry: { build: './src/js/main.js' },
  output,
  module: { rules },
  // performance: {hints: false},
  plugins,  
  devServer: { overlay: true }
}




if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports = {
    mode: 'production',
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    optimization: {
        minimizer: [new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    comments: false //use it for removing comments like "/*! ... */"
                }
            }
        })]
    }
}
}