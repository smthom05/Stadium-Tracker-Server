const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({

  name: String,
  coordinates: [
    lat: {
      type: Decimal128
    },
    lon: {
      type: Decimal128
    }
  ],
  team: [
    teamName: {
      type: String
    }
  ],
  facts: [
    fact: {
      type: String
    }
  ],
  capacity: {
    type: Number
  },
  locationPhoto: {
    type: String
  },
  upcomingEvents: [
    event: {
      opponentName: String,
      ticketLink: String,
      date: Date
    }]
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
