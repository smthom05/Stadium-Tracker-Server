const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({

  name: String,
  coordinates: {
    lat: Number,
    lon: Number
  },
  team: {
    teamName: {
      type: String
    }
  },
  facts: [
  ],
  capacity: {
    type: Number
  },
  locationPhoto: {
    type: String
  },
  upcomingEvents: [
    // event: {
    //   opponentName: String,
    //   ticketLink: String,
    //   date: Date
    // }
  ]
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
