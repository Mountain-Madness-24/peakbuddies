const express = require('express');
const router = express.Router();
const passport = require('passport');

// Trigger LinkedIn authentication
router.get('/linkedin',
  passport.authenticate('linkedin'));

// Handle callback from LinkedIn
router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
