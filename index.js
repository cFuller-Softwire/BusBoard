const request = require('request');
const readline = require('readline-sync');
const getCoordsFromPostcode = require('./getCoordsFromPostcode');
const tflApi = require('./TFL_API');

function main() {

    getCoordsFromPostcode.getPostcodeAndThen(function(postcode) {
        tflApi.getNearestTwoBusStopAndThen(postcode["result"]["longitude"], postcode["result"]["latitude"], function(nearestBusStops) {
            tflApi.getBusArrivals(nearestBusStops["places"][0]["id"]);
            tflApi.getBusArrivals(nearestBusStops["places"][1]["id"]);
        });
    });
}

main();

