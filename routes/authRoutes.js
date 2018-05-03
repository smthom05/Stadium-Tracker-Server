const passport = require('passport');

// Require all models
let User = require("../models/User");

module.exports = function(app) {

  // Facebook Routes
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['user_friends']
    })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      // res.redirect('/');
      console.log('Successful Facebook Login');
    });

  // Twitter Routes
  app.get('/auth/twitter',
    passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      // res.redirect('/');
      console.log('Successful Twitter Log In');
    });

  // Google Routes
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      // res.redirect('/');
      console.log("Successful Google Login");
    });
};
