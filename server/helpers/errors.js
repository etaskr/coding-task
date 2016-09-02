// @flow

'use strict';

/**
 * Custom error that can be used throughout the app and caught by the error handler
 * @param {Number} status  status code - defaults to 400
 * @param {String} message error message
 */
class ExtendableError extends Error {
    name: string;
    message: string;
    statusCode: number;

    constructor (status: number = 400, message: string) {
        super(message);

        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = status;
    }
}


/**
 * Bad request error
 * @param {String} message error message
 */
class BadRequestError extends ExtendableError {
    constructor (message: string = 'Bad Request') {
        super(400, message);
    }
}


/**
 * Authentication Error
 * @param {String} message - defaults to 'Not authorized'
 */
class AuthError extends ExtendableError {
    constructor (message: string = 'Not Authorized') {
        super(401, message);
    }
}


/**
 * Access Forbidden Error
 * @param {String} message - defaults to `Forbidden`
 */
class ForbiddenError extends ExtendableError {
    constructor (message: string = 'Forbidden') {
        super(403, message);
    }
}


/**
 * Resource Not Found Error
 * @param {String} message - defaults to `Not Found`
 */
class NotFoundError extends ExtendableError {
    constructor (message: string = 'Not Found') {
        super(404, message);
    }
}


/**
 * Uninitialized Error
 */
class InternalError extends ExtendableError {
    constructor (message: string = 'Internal Server Error') {
        super(500, message);
    }
}

export {
    ExtendableError as Common,
    BadRequestError as BadRequest,
    AuthError as Auth,
    ForbiddenError as Forbidden,
    NotFoundError as NotFound,
    InternalError as Internal
}
