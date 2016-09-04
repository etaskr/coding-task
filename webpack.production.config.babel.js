'use strict';

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
    entry: [
        path.join(__dirname, '/app/src/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: 'app/index.template.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new ExtractTextPlugin('[name]-[hash].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        // new StatsPlugin('webpack.stats.json', {
        //     source: false,
        //     modules: false
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new CopyWebpackPlugin([
            { from: path.join(__dirname, '/app/assets'), to: 'assets' }
        ])
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
                "presets": ["es2015", "stage-0", "react"]
            }
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
        }]
    },
    postcss: [
        require('autoprefixer')
    ]
};

export default config;
