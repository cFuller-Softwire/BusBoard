const getCoordsFromPostcode = require('./postcodeApi');
const tflApi = require('./tflApi');
const DisplayBuses = require('./sortAndDisplayBuses');

function main() {
    getCoordsFromPostcode.getPostcodeAndThen(function(coords) {
        tflApi.getNearestTwoBusStopAndThen(coords, function(nearestBusStopsId) {
            tflApi.getBusArrivals(nearestBusStopsId[0], function(sortedBusArrivals) {
                DisplayBuses.displayBuses(sortedBusArrivals);
            });
            tflApi.getBusArrivals(nearestBusStopsId[1], function(sortedBusArrivals) {
                DisplayBuses.displayBuses(sortedBusArrivals);
            });
        });
    });

    /*
    const postcode = getCoordsFromPostcode.getPostcodeAndThen();
    console.log(postcode);
    const nearestBusStops = tflApi.getNearestTwoBusStopAndThen(postcode["result"]["longitude"], postcode["result"]["latitude"]);
    console.log(nearestBusStops);
    tflApi.getBusArrivals(nearestBusStops["places"][0]["id"]);
    tflApi.getBusArrivals(nearestBusStops["places"][1]["id"]);
    */
}

main();

