const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');




router.get('/getusers', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error: error });
  }
});

router.get('/organizers', async (req, res) => {
    try {
      const organizers = await User.find({ isOrganizer: true });
      res.status(200).json(organizers);
    } catch (error) {
      console.error("Error fetching organizers:", error);
      res.status(500).json({ message: "Failed to fetch organizers", error: error });
    }
});
  

module.exports = router;

  

