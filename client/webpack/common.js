const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { resolve } = require('./util')

module.exports = {
	entry: {
		polyfills: resolve('src/polyfills.js'),
    app: resolve('src/index.tsx'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.scss', '.sass', '.css'],
		alias: {
			'@': resolve('src'),
			'@components': resolve('src/components'),
			'@redux': resolve('src/redux'),
			'@services': resolve('src/services'),
			'@interfaces': resolve('src/interfaces'),
    }
	},
	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
  },
	plugins: [
		new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [ resolve('dist') ]
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ])
	],
}
