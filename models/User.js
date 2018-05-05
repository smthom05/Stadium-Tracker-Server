const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  fullName: String,
  favoriteTeam: String,
  gameHistory: [
    {
      location: String,
      teams: [
        {
          name: String,
          score: Number
        }
      ],
      date: String,
      photo: String,
      moreInfo: String
    }
  }],
  settings: {
    incognito: {
      type: Boolean,
      default: false
    }
  },
  friends: [{
    friendId: {
      type: Number
    }
  ],
  userImage: String
});

UserSchema.methods.getFullName = function() {
  this.fullName = this.firstName + " " + this.lastName;
  return this.fullName;
};

UserSchema.plugin(findOrCreate);

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
