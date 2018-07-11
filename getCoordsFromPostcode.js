const request = require('request');
const readline = require('readline-sync');

exports.getPostcodeAndThen = function(callback) {
    console.log("Please enter your postcode. (Softwire: 'NW5 1TU')");
    const postcode = readline.prompt();
    const postcodeUrl = `https://api.postcodes.io/postcodes/${postcode}`;
    request(postcodeUrl, function(error, response, body) {
        if (response.statusCode === 404) {
            console.log("Not a valid postcode! Please enter a valid postcode.");
        } else {
            const postcode = JSON.parse(body);
            callback(postcode);
        }
    });
}