var util = require('util');

function ForecastError (errors) {
    Error.captureStackTrace(this, ForecastError);
    this.errors = errors;
}

// inherites from Error class
util.inherits(ForecastError, Error);

module.exports = ForecastError;