const passport = require('passport');

// Require all models
let User = require("../models/User");

module.exports = function(app) {
  // Facebook Routes
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
    console.log('Successful Facebook Login');
  });
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['user_friends']}), (req, res) => {
    return res.json(res.data)
  });

  // Twitter Routes
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), (req, res) => {
    console.log('Successful Twitter Login');
  });
  app.get('/auth/twitter', passport.authenticate('twitter'), (req, res) => {
    return res.json(res.data)
  });

  // Google Routes
  app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:8100'}), (req, res) => {
    console.log("Successful Google Login");
    // return res.data;
  });
  app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}), (req, res) => {
    return res.json(res.data)
  });
};
