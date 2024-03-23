const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

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


  router.post('/login', async function(req, res) {
    const user =  await User.findOne({email: req.body.email});
    if(!user){
        res.status(404).json({ message: "Incorrect email", isSuccess: false});
    }    
    else{
        const validPassword = req.body.password ==  user.password;
        if(!validPassword){
            res.status(401).json({ message: "Incorrect password", isSuccess: false});
        }
        else{
            req.session.email = user.email;
            res.status(200).json({ message: "success", user_info:  user, isSuccess: false});
        }
    }
});

  

module.exports = router;
