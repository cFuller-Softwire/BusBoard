const request = require('request');

exports.getRequestThenParseAndThen = function (url, callback) {
    request(url, function (error, response, body) {
        if (response.statusCode !== 200 || error !== null) {
            console.log("Error:", error);
            console.log("Statuscode:", response.statusCode);
        } else {
            const bodyJson = JSON.parse(body);
            callback(bodyJson);
        }
    });
}

