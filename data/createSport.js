const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = '?client_id=' + process.env.CLIENT_ID;
const CLIENT_SECRET = '&client_secret=' + process.env.CLIENT_SECRET;
let SEARCH_URL = 'https://api.seatgeek.com/2/events';
let SPORT_NAME = '&taxonomies.name=';
const LIMIT = '&per_page=200';
let SERVER_URL = 'http://localhost:';
const PORT = process.env.PORT || 3000;
// Update server URL with port
SERVER_URL += PORT;

let locations = [];

let sport = {
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


  create: function(sport) {
    SPORT_NAME += sport;
    // Update our URL
    SEARCH_URL += CLIENT_ID + CLIENT_SECRET + SPORT_NAME + LIMIT;
    return axios.get(SEARCH_URL)
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
        axios.post(SERVER_URL + '/locations', locations)
          .then(res => {
            // console.log(res.data[0].nextEvent);
          }).catch(err => {
            console.log(err.message);
          })

        axios.get(SERVER_URL + '/locations')
          .then(res => {
            console.log(res.data);
          })
      })
  }
};

module.exports = sport;
