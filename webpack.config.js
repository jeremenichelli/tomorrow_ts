const path = require('path');
const pathOutput = path.resolve(__dirname, 'dist');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;
const isProd = env === 'production';

module.exports = {
	mode: isProd ? env : 'development',
	devServer: {
		contentBase: pathOutput,
		compress: true,
		port: 8080
	},
	entry: [
		'multi-entry-loader?include=./src/**/*.html!',
		'multi-entry-loader?include=./src/**/*.ts!',
    'multi-entry-loader?include=./src/**/*.js!',
		'multi-entry-loader?include=./src/shaders/**/*.glsl!',
		'multi-entry-loader?include=./src/shaders/**/*.frag!',
		'multi-entry-loader?include=./src/shaders/**/*.vert!'
	],
  devtool: isProd ? 'source-map' : 'inline-source-map',
	output:{
		filename: 'main.js',
		path: pathOutput
	},
	optimization: {
    minimize: isProd
  },
	resolve: {
		extensions: ['.js', '.ts']
	},
	module: {
		rules: [
			{
				exclude: /\.d\.ts/
			},
			{
				test: /\.html/,
				loader: 'file-loader?name=[name].[ext]',
			},
			{
				test: /\.(glsl|vert|frag)$/,
				use: 'raw-loader'
			},
			{ 
        test: /\.tsx?$/,
        loader: 'ts-loader'
			},
			{ 
        test: /\.s[ac]ss$/i,
				use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
			}
		]
  },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({ filename: 'main.css' })
	]
};