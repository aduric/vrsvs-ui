module.exports = {
  entry: [
    './source/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: "js/bundle.js",
    publicPath: "/",
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, 
        loaders: [
          "babel-loader"
        ]
      },
      {test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify'
        ]
      }, 
      {test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify'
      }, 
      {test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.svg$/,
        loader: 'react-svg-loader'
      }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: __dirname + '/public'
  }
};