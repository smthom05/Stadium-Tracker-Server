// Require User model
const User = require("../models/User");

module.exports = function(app) {
  /*
    Get routes
  */
  // Get leaderboard stats for all sports
  app.get("/leaderboard", (req, res) => {
    // console.log('Request body:', req.body);
    return User
      .find({})
      .then((dbUsers) => {
        let rankings = [];

        dbUsers.forEach((user) => {
          let newRanking = {
            name: user.firstName + ' ' + user.lastName.charAt(0) + '.',
            photo: user.userImage,
            totalGames: user.gameHistory.length,
          }
          rankings.push(newRanking);
        });

        rankings.sort((a, b) => b.totalGames - a.totalGames); // Sort by most games attended

        return res.json(rankings);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
  // Get leaderboard stats for a specific sport
  app.get("/leaderboard/:sport", (req, res) => {
    // console.log('Request body:', req.body);
    return User
      .find({})
      .then((dbUsers) => {
        let rankings = [];

        dbUsers.forEach((user) => {
          let newRanking = {
            name: user.firstName + ' ' + user.lastName.charAt(0) + '.',
            photo: user.userImage,
            totalGames: user.gameHistory.length,
          }
          rankings.push(newRanking);
        });

        rankings.sort((a, b) => b.totalGames - a.totalGames); // Sort by most games attended

        return res.json(rankings);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
  // Get leaderboard stats for a specific sport by conference
  app.get("/leaderboard/:sport/:conference", (req, res) => {
    // console.log('Request body:', req.body);
    return User
      .find({})
      .then((dbUsers) => {
        let rankings = [];

        dbUsers.forEach((user) => {
          let newRanking = {
            name: user.firstName + ' ' + user.lastName.charAt(0) + '.',
            photo: user.userImage,
            totalGames: user.gameHistory.length,
          }
          rankings.push(newRanking);
        });

        rankings.sort((a, b) => b.totalGames - a.totalGames); // Sort by most games attended

        return res.json(rankings);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
      });
  });
};
