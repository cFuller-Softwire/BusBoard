const postcodeApi = require('./postcodeApi');
const tflApi = require('./tflApi');
const displayBuses = require('./sortAndDisplayBuses');

exports.main = function(postcode) {
    return postcodeApi
        .getPostcodeCoords(postcode)
        .then((coords) => tflApi.getNearestTwoBusStop(coords))
        .then(function (nearestBusStop) {
            const sortedTwoBus = nearestBusStop.map(x => tflApi.getBusArrivals(x));
            return Promise.all(sortedTwoBus);
        })
        .then(function (sortedBusArrivals){
            return displayBuses.displayBuses(sortedBusArrivals);
        })
        .catch((err) => console.log(err));
};


