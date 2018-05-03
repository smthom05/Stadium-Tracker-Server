const passport = require('passport');
const User = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // TODO Finish adjusting Facebook App settings

  // Facebook
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'https://localhost:3002/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({
      //     facebookId: profile.id
      //   },
      //   function(err, user) {
      //     return cb(err, user)
      //   });
    }
  ));

  // Twitter
  passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      //   User.findOrCreate({
      //     twitterId: profile.id
      //   }, function(err, user) {
      //     return cb(err, user);
      //   });
    }
  ));

  // Google
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        fullName: profile.displayName,
        userImage: profile.photos[0].value
      }, function(err, user) {
        console.log(user);
        return cb(err, user);
      });
    }
  ));
}
