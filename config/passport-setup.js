const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook');
const config = require('./config');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: '/auth/google/redirect'
    },
    function(accessToken, refreshToken, profile, doneCallback) {
      // console.log({ profile });
      User.findOne({ providerId: profile.id }).then((currentUser) => {
        if (currentUser) {
          //user already exists
          console.log('user exists: ', currentUser);
          doneCallback(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            providerId: profile.id,
            provider: 'Google'
          })
            .save()
            .then((user) => {
              console.log('new user', { user });
              doneCallback(null, user);
            });
        }
      });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: '/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, doneCallback) {
      new User({
        username: profile.username,
        providerId: profile.id,
        provider: 'GitHub'
      })
        .save()
        .then((user) => {
          console.log({ user });
          doneCallback(null, user);
        });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: '/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      cb(null, profile);
      //Database logic here with callback containing our user object
    }
  )
);
