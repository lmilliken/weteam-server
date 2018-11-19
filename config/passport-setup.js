const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const config = require('./config');
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: '/auth/google/redirect'
    },
    () => {}
    // (accessToken, refreshToken, profile, done) => {
    //   console.log('called in here', { profile });

    //   new User({
    //     username: 'something',
    //     googleId: 'dklsjdf'
    //   })
    //     .save()
    //     .then((newUser) => {
    //       console.log('created', newUser);
    //       done();
    //     })
    //     .catch((e) => console.log(e));
    // }
  )
);
