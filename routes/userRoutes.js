// Require all models
const User = require("../models/User");

module.exports = function(app) {
  /*
    Get routes
  */
  // Get all users
  app.get("/users", (req, res) => {
    console.log(req.params);
    return User
      .find({})
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
  // Get user by id
  app.get("/users/:userid", (req, res) => {
    console.log(req.params);
    return User
      .findById(req.params.userid)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
  // Get all user stats for leaderboard
  app.get("/users/leaderboard", (req, res) => {
    console.log(req.params);
    return User
      .find({})
      .then((dbUser) => {

        // TODO: Add logic for leaderboard

        return res.json(dbUser);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
  // Get all recent public activity
  app.get("/users/activityfeed", (req, res) => {
    return console.log(req.params);
    User
      .find({})
      .then((dbUser) => {

        // TODO: Add logic for activityfeed

        return res.json(dbUser);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
  // Get user's history by id
  app.get("/users/:userid/history", (req, res) => {
    console.log(req.params);
    return User
      .findById(req.params.userid)
      .then((dbUser) => res.json(dbUser.gameHistory))
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
  // Get user's stats by id
  app.get("/users/:userid/stats", (req, res) => {
    console.log(req.params);
    return User
      .findById(req.params.userid)
      .then((dbUser) => {

        // TODO: Add logic for user's personal stats

        return res.json(dbUser);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });

  /*
    Post routes
  */
  // Create user(s)
  app.post("/users", (req, res) => {
    console.log(req.params);
    const user = new User(req.body);
    user.getFullName();
    return User
      .create(user)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
  // Update user by id
  app.post("/users/:userid/update", (req, res) => {
    console.log(req.params);
    return User
      .findByIdAndUpdate(req.params.userid)
      .then((dbLocation) => res.json(dbLocation))
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
};
