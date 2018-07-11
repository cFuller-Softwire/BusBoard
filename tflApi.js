const request = require('request');
const sortBuses = require('./sortAndDisplayBuses');

const API_QUERY_STRING_TFL = 'app_id=66354b18&app_key=e9af9af78d300a4ee2674b1cef0333cc';

exports.getNearestTwoBusStopAndThen = function (coords, callback) {
        const findBusStopsUrl = `https://api.tfl.gov.uk/Place?type=NaptanOnstreetBusCoachStopCluster%2C%20NaptanBusWayPoint%2C%20NaptanPublicBusCoachTram%2C%20NaptanOnstreetBusCoachStopPair%2C%20NaptanBusCoachStation&lat=${coords[1]}&lon=${coords[0]}&radius=200&${API_QUERY_STRING_TFL}`;
        request(findBusStopsUrl, function (error, response, body) {
            if (response.statusCode !== 200 || error !== null) {
                console.log("Error:", error);
                console.log("Statuscode:", response.statusCode);
            } else {
                const nearestBusStopsJson = JSON.parse(body);
                const nearestBusStopsId = [];
                nearestBusStopsId.push(nearestBusStopsJson["places"][0]["id"], nearestBusStopsJson["places"][1]["id"]);
                callback(nearestBusStopsId);
            }
        });
}

exports.getBusArrivals = function (stopCode, callback) {
        const busArrivalUrl = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?${API_QUERY_STRING_TFL}`;
        request(busArrivalUrl, function (error, response, body) {
            if (response.statusCode !== 200 || error !== null) {
                console.log("Error:", error);
                console.log("Statuscode:", response.statusCode);
            }  else {
                const rawData = JSON.parse(body);
                const sortedBusArrivals = sortBuses.sortAndExtractData(rawData);
                callback(sortedBusArrivals);
            }
        });
}

