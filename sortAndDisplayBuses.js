exports.sortAndExtractData = function (rawData) {
    rawData.sort((a, b) => a['timeToStation'] > b['timeToStation']);
    return rawData.slice(0, 5);
};

exports.displayBuses = function (buses) {
    /* FOR CONSOLE DISPLAY
    for (let busstop of buses) {
        console.log(`\nThe next buses to arrive at ${busstop[0]["stationName"]} are:\n`);
        for (let bus of busstop) {
            console.log('Bus Route:', bus["lineId"]);
            console.log('Destination:', bus["destinationName"]);
            const minutes = Math.floor((bus["timeToStation"]) / 60);
            const seconds = (bus["timeToStation"]) % 60;
            console.log('Arriving in:', minutes, "minutes and", seconds, "seconds\n");
        }
    }*/
    const displayBusJson = [];
    for (let busstop of buses) {
        let oneStopArrivals = [];
        for (let bus of busstop) {
            let oneBusArrival = {};
            oneBusArrival["stationName"] = bus["stationName"];
            oneBusArrival["lineId"] = bus["lineId"];
            oneBusArrival["destinationName"] = bus["destinationName"];
            oneBusArrival["timeToStation"] = bus["timeToStation"];
            oneStopArrivals.push(oneBusArrival);
        }
        displayBusJson.push(oneStopArrivals);
    }
    return JSON.stringify(displayBusJson,null,2);
};
