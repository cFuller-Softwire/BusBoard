const express = require("express");
const index = require("./index");
const errorHandler = require('./errorHandler');

const app = express();
const postCodeRegex = '^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$';
app.get(`/currentDepartures/:postcode${postCodeRegex}`, (req, res) => {
    index
        .main(req.params["1"])
        .then((JsonBusData) => res.send(JsonBusData))
        .catch(errorHandler.error);

});
app.use(express.static('frontend'));
app.listen(3000, () => console.log(`App listening on port 3000.`));
