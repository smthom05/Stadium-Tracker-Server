const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require('axios');

const CLIENT_ID = '?client_id=NDYxNTQ2NHwxNTI0MzI5Njg2LjQ';
const CLIENT_SECRET = '&client_secret=9013b41e1d317fc053e1277f639788dabb32d9bf18bc4f97a4bdffe872fc450d';
let URL = 'https://api.seatgeek.com/2/events';
const SPORT = '&taxonomies.name=mlb';
const LIMIT = '&per_page=200';
let locations = [];

URL += CLIENT_ID + CLIENT_SECRET + SPORT + LIMIT;

var PORT = process.env.PORT || 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mlb", {
  useMongoClient: true
});

// Routes

app.get("/users", function(req, res) {
  db.User
    .find({})
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/users/:userid", function(req, res) {
  db.User
    .findById(req.params.userid)
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/locations/:locationid", function(req, res) {
  console.log(req.params);
  db.Location
    .findById(req.params.locationid)
    .then(function(dbLocation) {
      console.log(dbLocation);
      res.json(dbLocation);
    })
    .catch(function(err) {
      console.log(err.message);
      console.log(err.stack);
      res.error(err);
    });
});

app.get("/locations", function(req, res) {
  db.Location
    .find({})
    .then(function(dbLocation) {
      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/locations/facts", function(req, res) {
  db.Location
    .find({})
    .then(function(dbLocation) {

      // TODO: Add logic for ballpark facts

      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.get("/users/leaderboard", function(req, res) {
  db.User
    .find({})
    .then(function(dbUser) {

      // TODO: Add logic for leaderboard

      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/users/activityfeed", function(req, res) {
  db.User
    .find({})
    .then(function(dbUser) {

      // TODO: Add logic for activityfeed

      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/users/add", function(req, res) {
  db.User
    .create(req.body)
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/locations", function(req, res) {
  // console.log('what is our req body', req.body);
  db.Location
    .create(req.body, (err) => {
      if (err) return handleError(err)
    })
    .then(function(dbLocation) {
      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/users/:userid/history", function(req, res) {
  db.User
    .findById(req.params.userid)
    .then(function(dbUser) {
      res.json(dbUser.gameHistory);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/locations/:locationid/update", function(req, res) {
  // let { name, coordinates, team, facts, capacity, locationPhoto, upcomingEvents } = req.body;
  console.log(req);
  db.Location
    .findByIdAndUpdate(req.params.locationid, {
      $set: {
        name: name,
        coordinates: coordinates,
        team: team,
        facts: facts,
        capacity: capacity,
        locationPhoto: locationPhoto,
        upcomingEvents: upcomingEvents
      }
    }, {
      new: true
    })
    .then(function(dbLocation) {
      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/users/:userid/update", function(req, res) {
  db.User
    .findByIdAndUpdate(req.params.userid)
    .then(function(dbLocation) {
      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/users/:userid/stats", function(req, res) {
  db.User
    .findById(req.params.userid)
    .then(function(dbUser) {

      // TODO: Add logic for user's personal stats

      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/locations/:locationid/stats", function(req, res) {
  db.Location
    .findById(req.params.locationid)
    .then(function(dbLocation) {

      // TODO: Add logic for location's stats

      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});



let mlb = {
  getHomeTeam: function(performers) {
    let homeTeam = '';
    performers.forEach(performer => {
      if (performer.home_team) {
        homeTeam = performer.name;
      }
    })
    return homeTeam;
  },

  getAwayTeam: function(performers) {
    let awayTeam = '';
    performers.forEach(performer => {
      if (performer.away_team) {
        awayTeam = performer.name;
      }
    })
    return awayTeam;
  },

  getLocationPhoto: function(performers) {
    let locationPhoto = '';
    performers.forEach(performer => {
      if (performer.home_team) {
        locationPhoto = performer.images.huge;
      }
    })
    return locationPhoto;
  },

  getNextEvent: function(event) {

    let newEvent = {
      opponentName: this.getAwayTeam(event.performers),
      ticketLink: event.url,
      date: event.datetime_local
    }
    return newEvent;
  },


  search: function(query) {
    return axios.get(URL)
      .then(res => {
        locations = res.data.events.filter(location => {
          if (locations[location.venue.name]) {
            return false;
          }
          locations[location.venue.name] = true;
          return true
        }).map(location => {
          const newLocation = {
            name: location.venue.name,
            coordinates: [
              lat = location.venue.location.lat,
              lon = location.venue.location.lon
            ],
            team: this.getHomeTeam(location.performers),
            locationPhoto: this.getLocationPhoto(location.performers),
            nextEvent: this.getNextEvent(location)
          }
          return newLocation;
        });
      })
      .then(res => {
        // console.log(locations);
        axios.post('http://localhost:3000/locations', locations)
          .then(res => {
            // console.log(res.data[0].nextEvent);
          }).catch(err => {
            console.log(err.message);
          })

        axios.get('http://localhost:3000/locations')
          .then(res => {
            console.log(res.data);
          })
      })
  }
};
// mlb.search();

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
