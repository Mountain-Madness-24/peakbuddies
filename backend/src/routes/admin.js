const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/');


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