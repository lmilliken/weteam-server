const express = require('express');
const app = express();

const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const config = require('./config/config');

mongoose.connect(
  config.mongodb.dbURI,
  { useNewUrlParser: true },
  () => {
    console.log('connected to Mongo');
  }
);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.send('Home page');
});

app.listen(5000, () => {
  console.log(`Server up at port 5000`);
});
