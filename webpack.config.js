const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, 'build'),
    },
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname, './build')
    }
};