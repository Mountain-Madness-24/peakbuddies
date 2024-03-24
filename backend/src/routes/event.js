const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


// Assuming this middleware function checks if a user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
}

// Your existing protected route
router.get('/protected', ensureAuthenticated, function(req, res) {
  res.status(200).json({ message: "You are authenticated", user: req.user.userID });
});

// A new route to get an event, also protected
router.get('/getEvent', ensureAuthenticated, function(req, res) {
  const userId = req.user.userID; 
  
  console.log(userId)
  res.status(200).json({ message: "You are authenticated", user: req.user.userId });

  // Assuming userID is stored on the req.user object
  // Logic to find the event based on the userId or other parameters goes here
  // For example:
  // Event.find({ userId: userId }).then(event => {
  //   res.json(event);
  // }).catch(error => {
  //   res.status(500).json({ message: "Error fetching event", error: error });
  // });
});



router.post('/createEvent', async (req, res) => {
  try {
    const {
      eventJoinLink,
      adminsOfTheEvent,
      nameOfEvent,
      description,
      importantLinks,
      meetingRooms,
      startDate,
      endDate,
      intervalOfPing,
      isStarted,
      isFinished,
      participants
    } = req.body;

    // Create a new Event document
    const newEvent = new Event({
      eventJoinLink,
      adminsOfTheEvent,
      nameOfEvent,
      description,
      importantLinks,
      meetingRooms,
      startDate,
      endDate,
      intervalOfPing,
      isStarted: isStarted || false, // Default to false if not provided
      isFinished: isFinished || false, // Default to false if not provided
      participants
    });

    // Save the new Event to the database
    await newEvent.save();

    // Respond to the request indicating success
    res.status(201).json({
      message: "Hackathon event created successfully",
      event: newEvent,
      eventId: newEvent._id // Include the generated ID in the response
    });
  } catch (error) {
    console.error("Error creating hackathon event:", error);
    res.status(500).json({ message: "Failed to create hackathon event", error: error });
  }
});

module.exports = router;