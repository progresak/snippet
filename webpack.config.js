const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: '[name].[contenthash].js',
    },
    devServer: {
        historyApiFallback: {
            index: 'index.html',
        },
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: [
                    /node_modules/,
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        retainLines: true,
                        presets: [
                            [
                                '@babel/env',
                                {
                                    corejs: '3.2.1',
                                    modules: false,
                                    useBuiltIns: 'entry',
                                    targets: '> 0.1%, not dead, IE 11',
                                },
                            ],
                            '@babel/react',
                            '@babel/typescript',
                        ],
                        plugins: [
                            '@babel/proposal-object-rest-spread',
                            '@babel/proposal-class-properties',
                            'babel-plugin-styled-components',
                            '@babel/transform-runtime',
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|woff2|woff)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            publicPath: './',
            template: './public/index.html',
            minify: true,
            inject: 'head',
        }),
    ],
};
