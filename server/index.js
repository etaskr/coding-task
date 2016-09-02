// @flow

'use strict';

import path from 'path';
import express from 'express';
import morgan from 'morgan';

import logger from './helpers/logger';
import appErrorHandler from './middleware/error-handler';

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
 * Error Handler
 */
app.use(appErrorHandler);


app.listen(port, function () {
    logger.info('server listening on port ' + port);
});
