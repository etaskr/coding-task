// @flow

'use strict';

import path from 'path';
import express from 'express';
import morgan from 'morgan';
import logger from './helpers/logger';
import stringify from 'json-stringify-safe';

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? 8080 : 3000;
const clientPath = path.resolve(__dirname, '..', 'client');

const app = express();

/**
 * App Setup
 */
app.use(morgan('common', { stream: logger.stream }));
app.use(express.static(clientPath));


/**
 * Routes
 */
app.all('*', function response(req, res) {
    res.sendFile(path.join(clientPath, 'index.html'));
});


/**
 * Error Handlers
 */
app.use(function (err, req, res, next) {
    logger.error(err);

    res
        .status(err.status || 500)
        .type('application/json')
        .send(stringify(err));
});


app.listen(port, function () {
    logger.info('server listening on port ' + port);
});
