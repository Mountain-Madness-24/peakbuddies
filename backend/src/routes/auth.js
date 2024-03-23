const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Trigger LinkedIn authentication
router.get('/linkedin',
  passport.authenticate('linkedin'));

router.get('/', function(req, res) {
  res.redirect('/auth/linkedin');
});

// Handle callback from LinkedIn
router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// sample codes by Kian for testing UI
router.post('/testlogin', async function(req, res) {
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



router.post('/testsignup', async (req, res) => {
  try {
    // Create a new User instance from the request body
    const userToAdd = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      linkedinLink: req.body.linkedinLink,
      experience: req.body.experience,
      pictures: req.body.pictures,
      peopleMet: req.body.peopleMet,
      interestTags: req.body.interestTags,
      isOrganizer: req.body.isOrganizer,
      bioForAdmins: req.body.bioForAdmins,
      contactInfoForAdmins: req.body.contactInfoForAdmins,
      availability: req.body.availability,
      education: req.body.education
    });

    // Save the user to the database
    await userToAdd.save();

    // Respond to the client
    res.status(201).json({ message: "User added successfully!", user: userToAdd });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Failed to add user", error: error });
  }
});


module.exports = router;