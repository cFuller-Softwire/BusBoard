const express = require("express");
const index = require("./index");

const app = express();
app.get(`/currentDepartures/postcode/:postcode`, (req, res) => {
    index
        .main(req.params.postcode)
        .then((JsonBusData) => res.status(200).send(JsonBusData))
        .catch(function(err){
            console.log(err);
            res.status(500).send(err);
        });
});
app.listen(3000, () => console.log(`App listening on port 3000.`));
