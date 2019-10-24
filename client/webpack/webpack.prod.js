const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./common.js')
const { resolve } = require('./util')
const merge = require('webpack-merge')

module.exports = merge(common, {
  cache: false,
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
				exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
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
      filename: resolve('index.html'),
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
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
	],
})
