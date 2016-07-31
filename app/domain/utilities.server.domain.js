(function() {
"use strict";

var fs = require('fs'),
    development = require('../../config/env/development');

/**
 * Utilites class
 */
class Utilities {

    static getSslCertificate() {
        return {
            key  : fs.readFileSync(development.sslKey),
            cert : fs.readFileSync(development.sslCert)
        };
    }

    static isObjectUndefinedOrNullOrEmpty(theObject) {
        if (typeof theObject === 'undefined') {
            return true;
        }

        if (theObject === null)
        {
            return true;
        }

        for (var key in theObject) {
            if (theObject.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Utilities;

})();
