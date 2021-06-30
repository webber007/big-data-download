const path = require('path')
const fs = require('fs')
const pkgPath = path.join(__dirname, '/../package.json');
let pkg = fs.readFileSync(pkgPath);
pkg = JSON.parse(pkg);

const webpackConfig={
	output: {
	    path: path.resolve(__dirname, '../dist'),
	    filename: pkg.name + '.' + pkg.version + '.js'
  	},
	module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules)/,
	      loader: 'babel-loader'
	    }
	  ]
	},
	mode: 'production'
}

module.exports = webpackConfig