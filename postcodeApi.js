const readline = require('readline-sync');
const getRequest = require('./httpsRequestAndParseToJson');

exports.getPostcodeAndThen = function (callback) {
        console.log("Please enter your postcode. (Softwire: 'NW5 1TU')");
        const postcode = readline.prompt();
        const postcodeUrl = `https://api.postcodes.io/postcodes/${postcode}`;
        getRequest.getRequestThenParseAndThen(postcodeUrl, function(postcode) {
            const coords = [];
            coords.push(postcode["result"]["longitude"], postcode["result"]["latitude"]);
            callback(coords);
        })
}
