function getSSL() {
    var fs = require('fs');
    
    return {
        key  : fs.readFileSync(__dirname + '/../certificates/server.key'),
        cert : fs.readFileSync(__dirname + '/../certificates/server.crt')
    };
}

module.exports = {
    getSSL: getSSL
};
