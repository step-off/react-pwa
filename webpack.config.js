const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    https: true,
    port: 3000
  },
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/public"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};