const request = require('request');

exports.getRequestThenParseAndThen = function (url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (response.statusCode !== 200 || error !== null) {
                reject(console.log(`Error: ${error} StatusCode: ${response.statusCode}`));
            } else {
                resolve(JSON.parse(body));
            }
        });
    });

};

