const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            }
            // other rules for different file types can go here
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/website/E-Learning-Website/index.html',
            filename: 'index.html',
        }),
    ],
};
