'use strict';

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '/app/src/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.template.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new CopyWebpackPlugin([
            { from: path.join(__dirname, '/app/assets'), to: 'assets' }
        ])
        // new sassLintPlugin({
        //     configFile: '.sass-lint.yml',
        //     glob: '/app/**/*.s?(a|c)ss'
        // })
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],
        // {
        //     test: /\.js$/,
        //     exclude: /node_modules/,
        //     loader: 'jscs-loader'
        // }],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                'presets': ['react', 'es2015', 'stage-0', 'react-hmre']
            }
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    }
};

export default config
