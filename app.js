const express = require("express");
const https = require('node:https');
const app = express();
const bodyParsesr = require("body-parser");

app.use(bodyParsesr.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")

})

app.post("/", function (req, res) {
    
    const query = req.body.cityName
    const appid = "587cf288fcccc6f7c2f1320e7386737d"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit

    https.get(url, function (response) {
        console.log(response.statusCode)

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherdesp = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temp in" + query + " is " + temp + " degree Celcius </h1>")
            res.write("<p>The weather is currently looks like " + weatherdesp + "</p>")
            res.write("<img src=" + imageUrl + ">")
            res.send();

        })
    })

})




app.listen(3000, function () {
    console.log("Server is running on port 3000.")
});