const postcodeApi = require('./postcodeApi');
const tflApi = require('./tflApi');
const displayBuses = require('./sortAndDisplayBuses');
const errorHandler = require('./errorHandler');

function main() {
    postcodeApi.getPostcodeAndThen()
        .then(function (coords) {
            return tflApi.getNearestTwoBusStopAndThen(coords)
        })
        .then(function (nearestBusStop) {
            const sortedTwoBus = [];
            for (let item in nearestBusStop) {
                sortedTwoBus.push(tflApi.getBusArrivals(nearestBusStop[item]));
            }
            return Promise.all(sortedTwoBus);
        })
        .then(function (sortedBusArrivals) {
            displayBuses.displayBuses(sortedBusArrivals);
        })
        .catch(errorHandler.error)
}

main();

