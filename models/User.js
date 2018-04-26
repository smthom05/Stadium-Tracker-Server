const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  fullName: this.firstName + this.lastName,
  favoriteTeam: String,
  gameHistory: [{
    location: {
      type: String
    },
    teams: [
      team1: {
        name: String,
        score: Number
      },
      team2: {
        name: String,
        score: Number
      },
    ],
    moreInfo: {
      type: String
    }
  }],
  settings: [{
    incognito: {
      type: Boolean
    }
  }],
  friends: [
    friendId: {
      type: Number
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
