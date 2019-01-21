const path = require("path");
const {GenerateSW} = require("workbox-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
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
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
	plugins: [
        new GenerateSW({
	        directoryIndex: 'index.html',
	        clientsClaim: true,
	        importWorkboxFrom: 'local',
	        runtimeCaching: [{
		        urlPattern: new RegExp('^https://jsonplaceholder.typicode.com/'),
		        handler: 'staleWhileRevalidate',
		        options: {
			        cacheableResponse: {
				        statuses: [0, 200]
			        }
		        }
            }]
        })
    ]
};