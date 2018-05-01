// Require all models
const Location = require("../models/Location");

module.exports = function(app) {
  /*
    Get routes
  */
  // Get all locations
  app.get("/locations", (req, res) => {
    return Location
      .find({})
      .then((dbLocation) => res.json(dbLocation))
      .catch((err) => res.json(err));
  });
  // Get location by id
  app.get("/locations/:locationid", (req, res) => {
    return Location
      .findById(req.params.locationid)
      .then((dbLocation) => res.json(dbLocation))
      .catch((err) => res.json(err));
  });
  // Get all location facts
  app.get("/locations/facts", (req, res) => {
    return Location
      .find({})
      .then((dbLocation) => {

        // TODO: Add logic for ballpark facts

        return res.json(dbLocation);
      })
      .catch((err) => res.json(err));
  });
  // Get location's stats by id
  app.get("/locations/:locationid/stats", (req, res) => {
    return Location
      .findById(req.params.locationid)
      .then((dbLocation) => {

        // TODO: Add logic for location's stats

        return res.json(dbLocation);
      })
      .catch((err) => res.json(err));
  });

  /*
    Post routes
  */
  // Create location(s)
  app.post("/locations", (req, res) => {
    return Location
      .create(req.body, (err) => {
        if (err) return handleError(err)
      })
      .then((dbLocation) => res.json(dbLocation))
      .catch((err) => res.json(err));
  });
  // Update location by id
  app.post("/locations/:locationid/update", (req, res) => {
    // let { name, coordinates, team, facts, capacity, locationPhoto, upcomingEvents } = req.body;
    console.log(req);
    return Location
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
      .then((dbLocation) => res.json(dbLocation))
      .catch((err) => res.json(err));
  });
};
