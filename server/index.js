/* @flow */

'use strict';

import path from 'path';
import express from 'express';
import morgan from 'morgan';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.babel.js';

import logger from './helpers/logger';
import appErrorHandler from './middleware/error-handler';
import routes from './routes';

const isDevelopment = process.env.NODE_ENV !== 'production';

const port = isDevelopment ? 3000 : process.env.PORT;

const app = express();


// General app setup
app.use(morgan('common', { stream: logger.stream }));


if (isDevelopment) {
    // Webpack HMR setup
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    // Routes
    app.use('/', routes);

    app.all('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    });
} else {
    // static files
    app.use(express.static(path.join(__dirname, '..', 'dist')));

    // Routes
    app.use('/', routes);

    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
    });
}


// Error Handler
app.use(appErrorHandler);


// Start server
app.listen(port, function () {
    // $FlowIssue flow does not like the ternary definition or port - thinks port is a bool
    logger.info('server listening on port ' + port);
});
