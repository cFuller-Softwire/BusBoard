const readline = require('readline-sync');
const getRequest = require('./baseApiClient');

exports.getPostcodeCoords = function (postcode) {
    //console.log("Please enter your postcode. (Softwire: 'NW5 1TU')");
    //const postcode = readline.prompt().replace(" ","");
    const postcodeUrl = `https://api.postcodes.io/postcodes/${postcode}`;

    return getRequest
        .get(postcodeUrl)
        .then(postcodeJson => [postcodeJson["result"]["longitude"], postcodeJson["result"]["latitude"]]);
};
