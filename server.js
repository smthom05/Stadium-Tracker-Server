var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

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
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/MLB", {
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


app.get("/leaderboard", function(req, res) {
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

app.get("/activityfeed", function(req, res) {
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

app.post("/locations/add", function(req, res) {
  db.Location
    .create(req.body)
    .then(function(dbLocation) {
      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/:userid/history", function(req, res) {
  db.User
    .find({
      _id: req.params.userid
    })
    .then(function(dbUser) {
      res.json(dbUser.gameHistory);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/:locationid/update", function(req, res) {
  db.Location
    .findOneAndUpdate({
      _id: req.params.locationid
    },
    {
      req.body
    })
    .then(function(dbLocation) {
      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/:userid/update", function(req, res) {
  db.User
    .findOneAndUpdate({
      _id: req.params.userid
    },
    {
      req.body
    })
    .then(function(dbLocation) {
      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/:userid/stats", function(req, res) {
  db.User
    .find({
      _id: req.params.userid
    })
    .then(function(dbUser) {

      // TODO: Add logic for user's personal stats

      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/:locationid/stats", function(req, res) {
  db.Location
    .find({
      _id: req.params.locationid
    })
    .then(function(dbLocation) {

      // TODO: Add logic for location's stats

      res.json(dbLocation);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
