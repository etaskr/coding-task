var request = require('request');

exports.getRequest = function(url, callback) {
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(null, body);
        }
        else{
            if(error) {
                callback(error);
            }
            if (response.statusCode != 200) {
                callback(response.statusCode);
            }
        }
    });
}
