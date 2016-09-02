var path = require("path");

var config = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: "./src/app/index.js",
  target: 'web',
  output: {
    path: __dirname + "dist/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },
  devServer: {
    contentBase: './src'
  },
  module: {
    preLoaders: [
      { test: /\.json$/, loader: 'json'},
    ],
    loaders: [
      {
        test: /\.js?/,
        include: path.join(__dirname, 'src'),
        loader: "babel-loader"
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};

module.exports = config;
