const request = require('request');
const readline = require('readline-sync');

const API_QUERY_STRING_TFL = '?app_id=66354b18&app_key=e9af9af78d300a4ee2674b1cef0333cc';

function main() {

    console.log("Please enter the stop code required. (Lady Somerset House code: '490008660N') \n")

    const stopCode = readline.prompt();

    const url = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals${API_QUERY_STRING_TFL}`;

    request(url, function (error, response, body) {

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
    for (let bus of buses) {
        console.log('Bus Route:', bus["lineId"]);
        console.log('Destination:', bus["destinationName"]);
        const minutes = Math.floor((bus["timeToStation"]) / 60);
        const seconds = (bus["timeToStation"]) % 60;
        console.log('Arriving in:', minutes, "minutes and", seconds, "seconds\n");
    }

}

main();

