const sortBuses = require('./sortAndDisplayBuses');
const getRequest = require('./httpsRequestAndParseToJson');
const API_QUERY_STRING_TFL = 'app_id=66354b18&app_key=e9af9af78d300a4ee2674b1cef0333cc';

exports.getNearestTwoBusStopAndThen = function (coords, callback) {
        const findBusStopsUrl = `https://api.tfl.gov.uk/Place?type=NaptanOnstreetBusCoachStopCluster%2C%20NaptanBusWayPoint%2C%20NaptanPublicBusCoachTram%2C%20NaptanOnstreetBusCoachStopPair%2C%20NaptanBusCoachStation&lat=${coords[1]}&lon=${coords[0]}&radius=200&${API_QUERY_STRING_TFL}`;
        getRequest.getRequestThenParseAndThen(findBusStopsUrl, function(nearestBusStopsJson) {
            const nearestBusStopsId = [];
            nearestBusStopsId.push(nearestBusStopsJson["places"][0]["id"], nearestBusStopsJson["places"][1]["id"]);
            callback(nearestBusStopsId);
        })
}

exports.getBusArrivals = function (stopCode, callback) {
        const busArrivalUrl = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?${API_QUERY_STRING_TFL}`;
        getRequest.getRequestThenParseAndThen(busArrivalUrl, function(busArrivals) {
            const sortedBusArrivals = sortBuses.sortAndExtractData(busArrivals);
            callback(sortedBusArrivals);
        })
}

