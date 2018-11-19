const express = require('express');
const app = express();
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');

const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');
const config = require('./config/config');

mongoose.connect(
  config.mongodb.dbURI,
  () => {
    console.log('connected to Mongo');
  }
);
app.use(errorhandler({ log: errorNotification }));

function errorNotification(err, str, req) {
  console.log('ERROR', err);
}
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Home page');
});
app.listen(5000, () => {
  console.log(`Server up at port 5000`);
});
