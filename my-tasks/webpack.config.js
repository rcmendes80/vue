var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
    // loaders: [{
    //     test: /\.vue$/,
    //     loader: 'vue-loader'
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.json$/,
    //     loader: 'json'
    //   },
    //   {
    //     test: /\.css$/,
    //     loader: 'vue-style-loader!css-loader'
    //   },
    //   {
    //     test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    //     loader: "url-loader?limit=10000&mimetype=application/font-woff"
    //   },
    //   {
    //     test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    //     loader: "url-loader?limit=10000&mimetype=application/font-woff"
    //   },
    //   {
    //     test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    //     loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    //   },
    //   {
    //     test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    //     loader: "file-loader"
    //   }, {
    //     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    //     loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    //   },
    //   {
    //     test: /\.(png|jpg|gif|svg)$/,
    //     loader: 'url-loader',
    //     query: {
    //       limit: 10000,
    //       name: '[name].[ext]?[hash:7]'
    //     }
    //   }
    // ]



  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'

}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}