const router = require('express').Router();

const passport = require('passport');

router.get('/login');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

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
  req.logout();
  res.send('you are logged out');
});

module.exports = router;
