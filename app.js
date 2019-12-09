const path = require("path");
const hbs = require("hbs");
const express = require("express");

const request = require("request");
const geoCode = require("./utils/geocode");
const weatherCode = require("./utils/weathercode");

const app = express();

//specify paths for public and hsb extension
const publicDirPath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "/templates", 'views');
const partialsPath = path.join(__dirname, '/templates/partials');
//specify view engine and provide hsb  extension
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Serve up html, css files from public folder
app.use(express.static(publicDirPath));

// rendering dynamic data instead of sending 
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Created by Emykhet Akhu'
  });
});


app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Me',
    name: 'Created by Emykhet Akhu'
  });
});


// Send to APIendpoint
app.get('/weather', (req, res) => {
  const location = req.query.address;
  if (!location) {
    return res.send({
      error: 'Unable to find weather from given location..'
    });
  } else {
    // Callback chaining
    geoCode(location, (error, geoData) => {
      if (error) {
        return res.send("Error: ", error);
      }

      weatherCode(geoData.lat, geoData.long, (error, weatherData) => {
        if (error) {
          return res.send("Error: ", error);
        }
        res.send({
          location: geoData.loc,
          forecast: weatherData,
          address: location
        });
      });
    });
  }
});


// Port

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});


/****************************/

/*
// match sub pages with wildcards
app.get('/help/*', (req, res) => {
  res.status(404).send('article nt found..');
});

// Not Found wildcards
app.get('*', (req, res) => {
  res.status(404).render('404', {
    title: 'Contact Me',
    message: 'Page not Found',
    name: 'Created by Emykhet Akhu'
  });
});

*/

//***************************/


/*

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'No such data found'
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
    newProduct: req.query.search // add aditional info
  });
});

*/

/*
// Callback chaining
geoCode(location, (error, geoData) => {
  if (error) {
    return console.log("Error: ", error);
  }

  weatherCode(geoData.lat, geoData.long, (error, weatherData) => {
    if (error) {
      return console.log("Error: ", error);
    }
    console.log(geoData.loc);
    console.log(weatherData);
  });
});

*/

/*

geoCode("Atlanta", (error, data) => {
  console.log("Error: ", error);
  console.log("Data: ", data);
  console.log('**************');

  weatherCode(data.lat, data.long, (error, data) => {
    console.log("Error: ", error);
    console.log("Data: ", data);
  });
});

*/

/*
geoCode("Atlanta", (error, data) => {
  console.log("Error: ", error);
  console.log("Data: ", data);
  console.log('**************');
});


weatherCode(33.7491, -84.3902, (error, data) => {
  console.log("Error: ", error);
  console.log("Data: ", data);
});

*/

/*
//_____  01 - without JSON automatic parsing passed into params
request({ url }, (req, res) => {
  // convert incoming data from JSON to OBJECT
  const weatherData = JSON.parse(res.body);
  // grab the currently key from the data object
  console.log(weatherData.currently);
});
*/

/*
//_____ With Auto JSON parsing passed to params. (check 01 for plain method)
request({ url: url, json: true }, (error, res) => {
  const weatherData = res.body;
  /*console.log(weatherData.currently);*/

/*if (error) {
    console.log("Unable to connect to weather service");
  } else if (res.body.error) {
    console.log("Unable to find the location");
  } else {
    const message = `${weatherData.daily.data[0].summary} It is currently ${weatherData.currently.temperature} degrees out. There is a ${weatherData.currently.precipProbability}% chance of rain.`;

    console.log(message);
  }
});

const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWtpbmRlIiwiYSI6ImNrM3QweXd1YzBhajkzb21pYnl5eXdhbG8ifQ.Kekw59cESh70_lriTO5oFQ`;

request({ url: geoUrl, json: true }, (error, res) => {
  if (error) {
    console.log("Unable to find the location at this time.");
  } else if (res.body.error) {
    console.log("Location cannot be found. Try again");
  } else {
    const geoData = res.body.features[0];
    const lat = geoData.center[1];
    const long = geoData.center[0];
    console.log(lat, ",", long);
  }
});

*/