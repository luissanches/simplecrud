const path = require('path');

module.exports = (env, args) => {
	
	return {
  entry: path.resolve(__dirname, './src/index.js'),
	output: {
    path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
  },
	devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
	optimization: {
		minimize: process.env.NODE_ENV === 'production',
		removeAvailableModules: true,
		mergeDuplicateChunks: true,
		flagIncludedChunks: true
	},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}],
      },
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpg|gif|woff|woff2|ttf|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100000
						}
					}
				]
			}
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
		static: {
      directory: path.join(__dirname, './dist'),
    },
		port: 4001,
		hot: true,
		historyApiFallback: true
  },
}};