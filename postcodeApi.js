const readline = require('readline-sync');
const getRequest = require('./httpsRequestAndParseToJson');

exports.getPostcodeAndThen = function () {
    console.log("Please enter your postcode. (Softwire: 'NW5 1TU')");
    const postcode = readline.prompt();
    const postcodeUrl = `https://api.postcodes.io/postcodes/${postcode}`;

    return getRequest
        .getRequestThenParseAndThen(postcodeUrl)
        .then(postcodeJson => [postcodeJson["result"]["longitude"], postcodeJson["result"]["latitude"]]);
};
