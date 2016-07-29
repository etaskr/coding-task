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
}

module.exports = Utilities;

})();
