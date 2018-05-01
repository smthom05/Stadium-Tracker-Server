const axios = require('axios');

const CLIENT_ID = '?client_id=NDYxNTQ2NHwxNTI0MzI5Njg2LjQ';
const CLIENT_SECRET = '&client_secret=9013b41e1d317fc053e1277f639788dabb32d9bf18bc4f97a4bdffe872fc450d';
let URL = 'https://api.seatgeek.com/2/events';
const SPORT = '&taxonomies.name=mlb';
const LIMIT = '&per_page=200';
let locations = [];

URL += CLIENT_ID + CLIENT_SECRET + SPORT + LIMIT;

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
        locations = res.data.events.map(location => {
          const newLocation = {
            name: location.venue.name,
            coordinates: [
              lat = location.venue.location.lat,
              lon = location.venue.location.lon
            ],
            team: this.getHomeTeam(location.performers),
            photo: this.getLocationPhoto(location.performers),
            nextEvent: this.getNextEvent(location)
          }
          return newLocation;
        });
      })
  }
};
mlb.search();

axios.post('http://localhost:3000/locations/add', locations)
  .then(res => {
    console.log(res.data);
  }).catch(err => {
    console.log(err.message);
  })

  axios.get('/locations')
    .then(res => {
      console.log(res.data);

    })
