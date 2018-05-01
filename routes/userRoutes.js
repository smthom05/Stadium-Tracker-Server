// Require all models
let User = require("../models/User");

module.exports = function(app) {
  /*
    Get routes
  */
  // Get all users
  app.get("/users", function(req, res) {
    User
      .find({})
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // Get user by id
  app.get("/users/:userid", function(req, res) {
    User
      .findById(req.params.userid)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // Get all user stats for leaderboard
  app.get("/users/leaderboard", function(req, res) {
    User
      .find({})
      .then(function(dbUser) {

        // TODO: Add logic for leaderboard

        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // Get all recent public activity
  app.get("/users/activityfeed", function(req, res) {
    User
      .find({})
      .then(function(dbUser) {

        // TODO: Add logic for activityfeed

        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // Get user's history by id
  app.get("/users/:userid/history", function(req, res) {
    User
      .findById(req.params.userid)
      .then(function(dbUser) {
        res.json(dbUser.gameHistory);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // Get user's stats by id
  app.get("/users/:userid/stats", function(req, res) {
    User
      .findById(req.params.userid)
      .then(function(dbUser) {

        // TODO: Add logic for user's personal stats

        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  /*
    Post routes
  */
  // Create user(s)
  app.post("/users", function(req, res) {
    User
      .create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // Update user by id
  app.post("/users/:userid/update", function(req, res) {
    User
      .findByIdAndUpdate(req.params.userid)
      .then(function(dbLocation) {
        res.json(dbLocation);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
