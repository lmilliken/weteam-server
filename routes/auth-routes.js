const router = require('express').Router();

const passport = require('passport');

router.get('/login');

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  res.send('github');
});

router.get('/facebook', passport.authenticate('facebook'));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    res.send('facebook');
  }
);
router.get('/logout', (req, res) => {
  res.send('logging out');
});

//Google doesn't work
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('callback place');
});

module.exports = router;
