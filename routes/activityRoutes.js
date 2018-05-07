// Require all models
const User = require("../models/User");

module.exports = function(app) {
  /*
    Get routes
  */
  // Get all recent public activity
  app.get("/activity", (req, res) => {
    // console.log('Request body:', req.body);
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
};
