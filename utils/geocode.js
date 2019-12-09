const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWtpbmRlIiwiYSI6ImNrM3QweXd1YzBhajkzb21pYnl5eXdhbG8ifQ.Kekw59cESh70_lriTO5oFQ`;

    request({
        url,
        json: true
    }, (error, res) => {
        if (error) {
            callback("Unable to find the location at this time.", undefined);
        } else if (res.body.features.length === 0) {
            callback("Location cannot be found. Try again", undefined);
        } else {
            const geoData = res.body.features[0];
            callback(undefined, {
                lat: geoData.center[1],
                long: geoData.center[0],
                loc: geoData.place_name
            });
        }
    });
};


module.exports = geoCode;