const express = require('express');
const router = express.Router();
const passport = require('passport');
const Meeting = require('../models/meeting')
const Event = require('../models/event')

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


router.post('/getEvent', async (req, res) => {
  try {
    const { eventId } = req.body;
    
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const event = await Event.findById(eventId);

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({ message: "Failed to retrieve event", error: error });
  }
});


// A new route to get an event, also protected
router.get('/getEvents', ensureAuthenticated, function(req, res) {
  const userId = req.user.userId; 
  User.find({ userId: userId }).then(user => {
    console.log(user);

    // no search the events corresponding the user event
    const eventIds = user[0].events;
    Event.find({ '_id': { $in: eventIds } })
    .then(events => {
      // Successfully found events, return them
      res.json(events);
    })
    .catch(error => {
      // Error fetching events
      res.status(500).json({ message: "Error fetching events", error: error });
    });
    // make a search in Event grabbing all the ids that match the ids in user[0].events then return that as a response

  }).catch(error => {
    res.status(500).json({ message: "Error fetching event", error: error });
  });
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