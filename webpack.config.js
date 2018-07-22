var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['./view/edit/index.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                    ]
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                }
            },

        ],
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: '[name].css',// css 产出路径
        }),
    ]
};