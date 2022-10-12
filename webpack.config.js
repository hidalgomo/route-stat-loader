const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][chunkhash].js',
        clean: true,
        assetModuleFilename: '[name][chuckhash][ext]'
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            { test: /\.(s[ac]|c)ss$/i, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|jpg|jpeg|gif|json)$/i, type: 'asset/resource' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            scriptLoading: 'defer'
        })
    ]
};