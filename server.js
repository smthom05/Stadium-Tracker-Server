const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const newSport = require("./data/createSport");
const PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();

// Configure middleware

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



// Add our routes to the app
require("./routes/locationRoutes")(app);
require("./routes/userRoutes")(app);

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

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
