const express = require('express');
const app = express();
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');
const config = require('./config/config');

mongoose.connect(
  config.mongodb.dbURI,
  () => {
    console.log('connected to Mongo');
  }
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.get('/error', (req, res) => {
  res.send('you got an error');
});
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Home page');
});
app.listen(5000, () => {
  console.log(`Server up at port 5000`);
});
