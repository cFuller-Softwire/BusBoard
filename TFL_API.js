const request = require('request');
const DisplayBuses = require('./sortAndDisplayBuses');

const API_QUERY_STRING_TFL = '?app_id=66354b18&app_key=e9af9af78d300a4ee2674b1cef0333cc';

exports.getNearestTwoBusStopAndThen = function(long, lat, callback) {
    const findBusStopsUrl = `https://api.tfl.gov.uk/Place?type=NaptanOnstreetBusCoachStopCluster%2C%20NaptanBusWayPoint%2C%20NaptanPublicBusCoachTram%2C%20NaptanOnstreetBusCoachStopPair%2C%20NaptanBusCoachStation&lat=${lat}&lon=${long}&radius=200`;
    request(findBusStopsUrl, function(error, response, body) {
        if (response.statusCode === 404) {
            console.log("No stop within 200m. Please try a different valid postcode.");
        } else {
            const nearestBusStops = JSON.parse(body);
            callback(nearestBusStops);
        }
    });

}

exports.getBusArrivals = function(stopCode) {
    const busArrivalUrl = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals${API_QUERY_STRING_TFL}`;
    request(busArrivalUrl, function (error, response, body) {
        if (response.statusCode === 404) {
            console.log("Not a valid stop code! Please enter a valid stop code.")
        } else {
            const rawData = JSON.parse(body);
            const sortedData = DisplayBuses.sortData(rawData);
            DisplayBuses.displayBuses(sortedData);
        }
    });
}

