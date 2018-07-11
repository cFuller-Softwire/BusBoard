exports.sortAndExtractData = function (rawData) {
    rawData.sort((a, b) => a['timeToStation'] > b['timeToStation']);
    return rawData.slice(0, 5);
}


exports.displayBuses = function (buses) {
    console.log(`\nThe next buses to arrive at ${buses[0]["stationName"]} are:\n`)
    for (let bus of buses) {
        console.log('Bus Route:', bus["lineId"]);
        console.log('Destination:', bus["destinationName"]);
        const minutes = Math.floor((bus["timeToStation"]) / 60);
        const seconds = (bus["timeToStation"]) % 60;
        console.log('Arriving in:', minutes, "minutes and", seconds, "seconds\n");
    }
}
