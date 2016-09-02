// @flow

import logger from '../helpers/logger';
import stringify from 'json-stringify-safe';
import { NotFound } from '../helpers/errors';

/**
 * Middleware used to catch and handle AppErrors
 * @param  {Error}    err  error object
 * @param  {Object}   req  http request
 * @param  {Object}   res  http response
 * @param  {Function} next next
 */
function appErrorHandler (err: Object, req: Object, res: Object, next: mixed) {
    // log error
    logger.error(err);

    // if no error, return 404
    if (!err) {
        err = new NotFound();
    }

    // default to server error
    err.message = err.message || 'Internal Server Error';

    res
        .status(err.status || 500)
        .type('application/json')
        .send(stringify(err));
}


/**
 * catch unresolved and rejected promises - just throw to fallback uncaught exception handler (see below)
 */
process.on('unhandledRejection', function (reason) {
    throw reason;
});


/**
 * Exit on uncaught exception
 * NOTE: would usually run app via pm2 and auto restart on uncaught exception after logging error
 */
process.on('uncaughtException', function (err) {
    // add empty params to keep Flow happy
    appErrorHandler(err, {}, {}, null);
    process.exit(1);
});

export default appErrorHandler;
