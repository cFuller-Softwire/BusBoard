const request = require('request');

function main()
{
    let findNextFive = {}
    const key = '?app_id=66354b18&app_key=e9af9af78d300a4ee2674b1cef0333cc';
    let stopCode = '490008660N';
    let url = 'https://api.tfl.gov.uk/StopPoint/' + stopCode + '/Arrivals' + key;


    request(url, function (error, response, body){
       console.log('error:', error);
       console.log('statusCode:', response && response.statusCode);
       let rawData = JSON.parse(body);

       for (let prediction of rawData) {
           findNextFive.rawData[id] = rawData[timeToStation];
       }
       console.log(findNextFive);
       //findnextFive.sort((a,b) => a < b);

    });



}

main();