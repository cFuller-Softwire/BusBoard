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
}

main();

