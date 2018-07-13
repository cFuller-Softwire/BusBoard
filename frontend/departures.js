function updateBusStopArrivals(elementId, arrivals) {
    let busList = document.createElement("UL");
    for (let bus of arrivals) {
        let busNode = document.createElement("LI");
        let textnode = document.createTextNode(`${bus["timeToStation"]}: ${bus["lineId"].toUpperCase()} to ${bus["destinationName"]}`);
        busNode.appendChild(textnode);
        busList.appendChild(busNode);
    }
    document.getElementById(elementId).innerHTML = "";
    document.getElementById(elementId).appendChild(busList);
}

function getDepartures() {
    let xhttp = new XMLHttpRequest();
    let postcode = document.getElementById("formPostcode").value.toUpperCase().replace(" ", "");
    xhttp.open('GET', `http://localhost:3000/currentDepartures/postcode/${postcode}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                const busArrivalResponse = JSON.parse(xhttp.response);
                document.getElementById("departuresTitle").innerHTML = `Next departures from the nearest two bus stops to ${postcode}`;
                document.getElementById("stopOne").innerHTML = busArrivalResponse[0][0]["stationName"];
                document.getElementById("stopTwo").innerHTML = busArrivalResponse[1][0]["stationName"];
                updateBusStopArrivals("busArrivalsAtStopOne", busArrivalResponse[0]);
                updateBusStopArrivals("busArrivalsAtStopTwo", busArrivalResponse[1]);
            }
        } else {
            console.log(new Error(`Status code was ${xhttp.status}`));
        }
    };
    xhttp.send(null);
}



