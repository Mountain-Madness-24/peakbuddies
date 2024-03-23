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

router.get('/login',
  function(req, res) {
    // Successful authentication, redirect home.
    res.status(200).json({ message: "success", isSuccess: false});
  });

  

module.exports = router;
