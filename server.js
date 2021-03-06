const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const newSport = require("./data/createSport");
const passport = require('passport');
const http = require('http');
const https = require('https');
const fs = require('fs');
const session = require('express-session');
const privateKey  = fs.readFileSync('ssl/server.key', 'utf8');
const certificate = fs.readFileSync('ssl/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();

// Configure middleware
app.set('trust proxy', 1);
app.use(passport.initialize());
app.use(session({
  secret: 'Stadium Warriors',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Add CORS handling
app.use(cors());

// Add CORS handling
app.use(cors());
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Add our routes to the app
require("./routes/locationRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/activityRoutes")(app);
require("./routes/leaderboardRoutes")(app);
require('./config/passport')(passport)

// Require all models
const db = require("./models");

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mlb", {
  useMongoClient: true
});


// Create a new sport
// newSport.create('mlb');

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

httpServer.listen(3001);
httpsServer.listen(3002);
