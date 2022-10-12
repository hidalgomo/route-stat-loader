const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            scriptLoading: 'defer'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    devtool: 'inline-source-map',
    devServer: {
        static: path.join(__dirname, 'build/'),
        // devMiddleware: {
        //     publicPath: './'
        // }
    },
    module: {
        rules:[
            // {
            //     test: /\.json$/,
            //     use: ['json-loader']
            // },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            }
        ]
    }
};