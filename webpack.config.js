module.exports = {
  entry: "./src/app/index.js",
  output: {
    path: __dirname,
    filename: "./src/bundles/frontend.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
