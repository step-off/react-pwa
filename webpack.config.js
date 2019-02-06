const path = require("path");
const {GenerateSW} = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		port: 3000
	},
	devtool: "source-map",
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
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					"css-loader"
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images'
						},
					},
				],
			},
			{
				test: /\.(woff|tiff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts'
						},
					},
				],
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new CleanWebpackPlugin(['public/precache-manifest.*.js']),
		new MiniCssExtractPlugin({
			filename: "app.css"
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new GenerateSW({
			clientsClaim: true,
			importWorkboxFrom: 'local',
			navigateFallback: '/index.html',
			runtimeCaching: [{
				urlPattern: new RegExp('^https://reqres.in/'),
				handler: 'staleWhileRevalidate',
				options: {
					cacheableResponse: {
						statuses: [0, 200, 201, 204]
					}
				}
			}]
		})
	]
};