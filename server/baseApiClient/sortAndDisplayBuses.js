exports.sortAndExtractData = function (rawData) {
    rawData.sort((a, b) => a['timeToStation'] > b['timeToStation']);
    return rawData.slice(0, 5);
};

exports.displayBuses = function (buses) {
    /*
    const displayBusJson = [];
    for (let busstop of buses) {
        let oneStopArrivals = [];
        for (let bus of busstop) {
            let oneBusArrival = {};
            oneBusArrival["stationName"] = bus["stationName"];
            oneBusArrival["lineId"] = bus["lineId"];
            oneBusArrival["destinationName"] = bus["destinationName"];
            const minutes = Math.floor((bus["timeToStation"]) / 60);
            const seconds = (bus["timeToStation"]) % 60;
            oneBusArrival["timeToStation"] = `${minutes} minutes ${seconds} seconds`;
            oneStopArrivals.push(oneBusArrival);
        }
        displayBusJson.push(oneStopArrivals);
    }
    */

    buses[0] = buses[0].map(function(bus) {
        return {
            stationName: bus.stationName,
            lineId: bus.lineId,
            destinationName: bus.destinationName,
            timeToStation: `${Math.floor((bus.timeToStation) / 60)} minutes ${bus.timeToStation % 60} seconds`
        } });
    buses[1] = buses[1].map(function(bus) {
        return {
            stationName: bus.stationName,
            lineId: bus.lineId,
            destinationName: bus.destinationName,
            timeToStation: `${Math.floor((bus.timeToStation) / 60)} minutes ${bus.timeToStation % 60} seconds`
        } });
    console.log(buses);
    return JSON.stringify(buses,null,2);
    //return JSON.stringify(displayBusJson,null,2);

};
