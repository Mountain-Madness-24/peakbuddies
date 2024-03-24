// In src/models/Meeting.js
const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  locationName: String,
  locationLatLon: {
    lat: Number,
    lon: Number
  },
  startingTime: Date,
  icebreakerQuestions: [String],
  eventStatus: String,
  membersOfMeeting: [{ type: String}],
  isFinished: Boolean,
  isStarted: Boolean,
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
