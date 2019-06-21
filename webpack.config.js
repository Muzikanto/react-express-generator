const path = require('path');

module.exports = {
    entry: './work/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                exclude: [__dirname + '/source/']
            },
            {
                test: /\.tsx?$/,
                exclude: [__dirname + '/react-ssr/']
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.js' ]
    },
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'commonjs'
    }
};
