const User = require('./models/user');
const mongoose = require('mongoose');

const config = require('./config/config');

mongoose.connect(
  config.mongodb.dbURI,
  { useNewUrlParser: true }
);

User.create({
  username: 'something',
  provilllderId: 'lsdfk',
  provider: 'GitHub'
})
  .then((user) => {
    console.log('user created: ', user);
  })
  .catch((err) => console.log('something went wrong', err));
