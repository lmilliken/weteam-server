const router = require('express').Router();

const passport = require('passport');

router.get('/login');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);
//passport.authenticate('google'),
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('callback place');
});

router.get('/logout', (req, res) => {
  res.send('logging out');
});

module.exports = router;
