// Require all models
let Location = require("../models/Location");

module.exports = function(app) {
  /*
    Get routes
  */
  // Get all locations
  app.get("/locations", function(req, res) {
    Location
      .find({})
      .then(function(dbLocation) {
        res.json(dbLocation);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // Get location by id
  app.get("/locations/:locationid", function(req, res) {
    console.log(req.params);
    Location
      .findById(req.params.locationid)
      .then(function(dbLocation) {
        res.json(dbLocation);
      })
      .catch(function(err) {
        res.error(err);
      });
  });
  // Get all location facts
  app.get("/locations/facts", function(req, res) {
    Location
      .find({})
      .then(function(dbLocation) {

        // TODO: Add logic for ballpark facts

        res.json(dbLocation);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // Get location's stats by id
  app.get("/locations/:locationid/stats", function(req, res) {
    Location
      .findById(req.params.locationid)
      .then(function(dbLocation) {

        // TODO: Add logic for location's stats

        res.json(dbLocation);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  /*
    Post routes
  */
  // Create location(s)
  app.post("/locations", function(req, res) {
    Location
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
  // Update location by id
  app.post("/locations/:locationid/update", function(req, res) {
    // let { name, coordinates, team, facts, capacity, locationPhoto, upcomingEvents } = req.body;
    console.log(req);
    Location
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
};
