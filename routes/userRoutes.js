// Require all models
const User = require("../models/User");

module.exports = function(app) {
  /*
    Get routes
  */
  // Get all users
  app.get("/users", (req, res) => {
    return User
      .find({})
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.json(err));
  });
  // Get user by id
  app.get("/users/:userid", (req, res) => {
    return User
      .findById(req.params.userid)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.json(err));
  });
  // Get all user stats for leaderboard
  app.get("/users/leaderboard", (req, res) => {
    return User
      .find({})
      .then((dbUser) => {

        // TODO: Add logic for leaderboard

        return res.json(dbUser);
      })
      .catch((err) => res.json(err));
  });
  // Get all recent public activity
  app.get("/users/activityfeed", (req, res) => {
    return User
      .find({})
      .then((dbUser) => {

        // TODO: Add logic for activityfeed

        return res.json(dbUser);
      })
      .catch((err) => res.json(err));
  });
  // Get user's history by id
  app.get("/users/:userid/history", (req, res) => {
    return User
      .findById(req.params.userid)
      .then((dbUser) => res.json(dbUser.gameHistory))
      .catch((err) => res.json(err));
  });
  // Get user's stats by id
  app.get("/users/:userid/stats", (req, res) => {
    return User
      .findById(req.params.userid)
      .then((dbUser) => {

        // TODO: Add logic for user's personal stats

        return res.json(dbUser);
      })
      .catch((err) => res.json(err));
  });

  /*
    Post routes
  */
  // Create user(s)
  app.post("/users", (req, res) => {
    return User
      .create(req.body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.json(err));
  });
  // Update user by id
  app.post("/users/:userid/update", (req, res) => {
    return User
      .findByIdAndUpdate(req.params.userid)
      .then((dbLocation) => res.json(dbLocation))
      .catch((err) => res.json(err));
  });
};
