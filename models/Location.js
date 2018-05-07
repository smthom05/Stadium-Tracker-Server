const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({

  name: String,
  coordinates: {
    lat: Number,
    lon: Number
  },
  team: String,
  facts: {
    capacity: Number,
    established: String
  },
  locationPhoto: {
    type: String
  },
  nextEvent: {
    opponentName: String,
    ticketLink: String,
    date: Date
  },
  recommendations: {
    food: String,
    drink: String,
    attraction: String
  }
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
