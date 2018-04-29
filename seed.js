const axios = require('axios');

const CLIENT_ID = '?client_id=NDYxNTQ2NHwxNTI0MzI5Njg2LjQ';
const CLIENT_SECRET = '&client_secret=9013b41e1d317fc053e1277f639788dabb32d9bf18bc4f97a4bdffe872fc450d';
let URL = 'https://api.seatgeek.com/2/events';
const SPORT = '&taxonomies.name=mlb';
const LIMIT = '&per_page=2';
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

  getUpcomingEvents: function(event) {
    let upcomingEvents = [];
    event.performers.forEach(() => {
      let newEvent = {
        opponentName: this.getAwayTeam(event.performers),
        ticketLink: event.url,
        date: event.datetime_local
      }
      upcomingEvents.push(newEvent);
    })
    return upcomingEvents;
  },

  search: function(query) {
    return axios.get(URL)
      .then(res => {
        // console.log(res.data.events[0].performers[0].images.huge)
        locations = res.data.events.map(location => {
          // console.log(location.performers)
          const newLocation = {
            name: location.venue.name,
            coordinates: [
              lat = location.venue.location.lat,
              lon = location.venue.location.lon
            ],
            team: this.getHomeTeam(location.performers),
            photo: this.getLocationPhoto(location.performers),
            upcomingEvents: this.getUpcomingEvents(location)
          }
          return newLocation;
        });
        console.log(locations[1].upcomingEvents)
      })
  }
};

mlb.search();

// axios.get('/locations/populate', {mlb})
//   .then(res => {
//     console.log(res.data);
//   })

  axios.get('/locations')
    .then(res => {
      console.log(res.data);
    })
