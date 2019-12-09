const request = require('request');

const weatherCode = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/604d68bf7214c8bdaf09e7c78d876477/${lat},${long}?units=si&lang=en`;

    //_____ With Auto JSON parsing passed to params. (check 01 for plain method)
    request({
        url,
        json: true
    }, (error, res) => {
        const weatherData = res.body;
        if (error) {
            callback("Unable to connect to weather service");
        } else if (res.body.error) {
            console.log("Unable to find the location");
        } else {
            const message = `${weatherData.daily.data[0].summary} It is currently ${weatherData.currently.temperature} degrees out. There is a ${weatherData.currently.precipProbability}% chance of rain.`;
            callback(undefined, message);
        }
    });
};
module.exports = weatherCode;