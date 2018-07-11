const request = require('request');
const readline = require('readline-sync');

exports.getPostcodeAndThen = function (callback) {
        console.log("Please enter your postcode. (Softwire: 'NW5 1TU')");
        const postcode = readline.prompt();
        const postcodeUrl = `https://api.postcodes.io/postcodes/${postcode}`;
        request(postcodeUrl, function (error, response, body) {
            if (response.statusCode !== 200 || error !== null) {
                console.log("Error:", error);
                console.log("Statuscode:",response.statusCode);
            } else {
                const postcode = JSON.parse(body);
                const coords = [];
                coords.push(postcode["result"]["longitude"], postcode["result"]["latitude"]);
                callback(coords);
            }
        });
}
