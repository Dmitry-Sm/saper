const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');


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
  test: /\.(png|jpg|gif)$/i,
  use: [
    {
      loader: 'url-loader'
    },
  ],
}



const rules = [
  style_loader,
  file_loader
]

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
    inject: 'body',
    inlineSource: '.(js|css)$',
  }),
  
  new HtmlWebpackInlineSourcePlugin()
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
    entry: { build: './src/js/main.js' },
    output,

    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        file_loader
      ]
    },
    
    plugins,  
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