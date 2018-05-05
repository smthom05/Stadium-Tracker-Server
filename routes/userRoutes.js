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
  app.get("/activity", (req, res) => {
    console.log('Request body:', req.body);
    User
      .find({
        settings: {
          incognito: false
        }
      })
      .then((dbUsers) => {
        let recentActivity = [];

        dbUsers.forEach((user) => {
          console.log(user);
          user.gameHistory.forEach((game) => {
            console.log(game);
            let newActivity = {
              name: user.firstName + ' ' + user.lastName.charAt(0) + '.', // Ex. 'John Tester' becomes 'John T.',
              photo: user.userImage,
              game
            };
            recentActivity.push(newActivity);
          });
        });

        // TODO: Add logic to sort recentActivity by most recent date/time

        return res.json(recentActivity);
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
