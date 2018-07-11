const request = require('request');
const readline = require('readline-sync');

const API_QUERY_STRING_TFL = '?app_id=66354b18&app_key=e9af9af78d300a4ee2674b1cef0333cc';

function main() {

    getPostcode();
}

function getPostcode() {
    console.log("Please enter your postcode. (Softwire: 'NW5 1TU')");
    const postcode = readline.prompt();
    const postcodeUrl = `https://api.postcodes.io/postcodes/${postcode}`;
    request(postcodeUrl, function(error, response, body) {
        if (response.statusCode === 404) {
            console.log("Not a valid postcode! Please enter a valid postcode.");
        } else {
            const postcode = JSON.parse(body);
            getNearestTwoBusStop(postcode["result"]["longitude"], postcode["result"]["latitude"]);
        }
    });
}
function getNearestTwoBusStop(long, lat) {
    const findBusStopsUrl = `https://api.tfl.gov.uk/Place?type=NaptanOnstreetBusCoachStopCluster%2C%20NaptanBusWayPoint%2C%20NaptanPublicBusCoachTram%2C%20NaptanOnstreetBusCoachStopPair%2C%20NaptanBusCoachStation&lat=${lat}&lon=${long}&radius=200`;
    request(findBusStopsUrl, function(error, response, body) {
        if (response.statusCode === 404) {
            console.log("No stop within 500m. Please try a different valid postcode.");
        } else {
            const nearestBusStops = JSON.parse(body);
            getBusArrivals(nearestBusStops["places"][0]["id"]);
            getBusArrivals(nearestBusStops["places"][1]["id"]);
        }
    });

}

function getBusArrivals(stopCode) {
    const busArrivalUrl = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals${API_QUERY_STRING_TFL}`;
    request(busArrivalUrl, function (error, response, body) {
        if (response.statusCode === 404) {
            console.log("Not a valid stop code! Please enter a valid stop code.")
        } else {
            const rawData = JSON.parse(body);
            const sortedData = sortData(rawData);
            displayBuses(sortedData);
        }
    });
}

function sortData(rawData) {
    rawData.sort((a, b) => a['timeToStation'] > b['timeToStation']);
    return rawData.slice(0, 5);
}

function displayBuses(buses) {
    console.log(`\nThe next buses to arrive at ${buses[0]["stationName"]} are:\n`)
    for (let bus of buses) {
        console.log('Bus Route:', bus["lineId"]);
        console.log('Destination:', bus["destinationName"]);
        const minutes = Math.floor((bus["timeToStation"]) / 60);
        const seconds = (bus["timeToStation"]) % 60;
        console.log('Arriving in:', minutes, "minutes and", seconds, "seconds\n");
    }
}

main();

