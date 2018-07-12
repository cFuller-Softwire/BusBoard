const postcodeApi = require('./postcodeApi');
const tflApi = require('./tflApi');
const displayBuses = require('./sortAndDisplayBuses');
const errorHandler = require('./errorHandler');

exports.main = function(postcode) {
    return postcodeApi
        .getPostcodeCoords(postcode)
        .then((coords) => tflApi.getNearestTwoBusStop(coords))
        .then(function (nearestBusStop) {
            const sortedTwoBus = nearestBusStop.map(x => tflApi.getBusArrivals(x));
            return Promise.all(sortedTwoBus);
        })
        //.then((sortedBusArrivals) => displayBuses.displayBuses(sortedBusArrivals))
        .then(function (sortedBusArrivals){
            return displayBuses.displayBuses(sortedBusArrivals);
        })
        .catch(errorHandler.error)
};


