exports.sortAndExtractData = function (rawData) {
    rawData.sort((a, b) => a['timeToStation'] > b['timeToStation']);
    return rawData.slice(0, 5);
};

exports.extractBusArrivals = function (buses) {
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
    return JSON.stringify(buses);
};
