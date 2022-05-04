const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';
	const config = {
		entry: './src/index.js',
		output: {
			filename: 'bundle.js',
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.js$/i,
					use: ['babel-loader'],
				},
				{
					test: /\.html$/i,
					use: ['html-loader'],
				},
				{
					test: /\.s?css$/i,
					use: [
						isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.(?:ico|gif|png|jpe?g|svg)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'img/[name][ext]',
					},
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf)$/,
					type: 'asset/inline',
				},
			],
		},
		optimization: {
			minimizer: [
				new ImageMinimizerPlugin({
					minimizer: {
						implementation: ImageMinimizerPlugin.imageminMinify,
						options: {
							plugins: [
								['gifsicle', { interlaced: true }],
								['mozjpeg', { quality: 70 }],
								['pngquant', { quality: [0.6, 0.8] }],
								['svgo', {
									name: 'removeViewBox',
									active: false,
								}],
							],
						},
					},
				}),
			],
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				favicon: './src/favicon.ico',
			}),
		],
		devServer: {
			hot: 'only',
			watchFiles: ['./src/*'],
			port: 9000,
		},
	};

	if (isProduction) {
		config.plugins.push(new MiniCssExtractPlugin({
			filename: '[name].css',
		}));
	}

	return config;
};
