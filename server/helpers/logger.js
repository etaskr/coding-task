// @flow

'use strict';

import winston from 'winston';

// Winston config
const config = {
    transports: [
        new (winston.transports.Console)({
            colorize: 'all'
        })
    ]
};

const logger = new winston.Logger(config);

// Stream object to use with Morgan for request logging
const stream = {
    write: function (message) {
        return logger.info(message);
    }
};

logger.stream = stream;

export default logger;
