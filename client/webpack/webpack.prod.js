const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const common = require('./common.js')
const { resolve } = require('./util')
const merge = require('webpack-merge')

module.exports = merge(common, {
  cache: true,
	mode: 'production',
	output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
		path: resolve('dist'),
	},
	module: {
		rules: [
      {
        test: /\.ts(x?)$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
				test: /\.(eot|svg|ttf|woff|woff2|gif)$/i,
				use: [
					{
						loader: 'url-loader',
					},
				],
			},
			{
				test: /.*\.(gif|png|jp(e*)g|svg)$/i,
				use: [
						{
								loader: "url-loader",
						}
				]
			},
		],
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifySCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify('http://localhost:3100')
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
	],
})
