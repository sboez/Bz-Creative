const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/scripts/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'dist/main.js',
	},
	performance: {
		hints: false
	},
	plugins: [
		new CopyWebpackPlugin([{ from: '**/*', to: '' }], {
			context: 'src',
			writeToDisk: true,
		}),
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		host: '192.168.1.11',
	    port: 9000,
	    disableHostCheck: true,
		historyApiFallback: true
	},
	module:
    {
        rules:
        [
            {
                test: /\.(glb|gltf)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/models/'
                        }
                    }
                ]
            },
        ]
    }

};
