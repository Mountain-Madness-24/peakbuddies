const mongoose = require('mongoose');

const { Schema } = mongoose;

const event = new Schema({
  eventJoinLink: { type: String},
  adminsOfTheEvent: [{ type: String }], // Assuming 'User' schema exists for admins
  nameOfEvent: { type: String},
  description: { type: String},
  importantLinks: [String], // Array of strings for links
  meetingRooms: [{
    name: String,
    latLong: {
      lat: Number,
      long: Number
    }
  }],
  startDate: { type: Date,  },
  endDate: { type: Date},
  intervalOfPing: Number, // Could be in minutes or seconds, depending on your requirement
  isStarted: { type: Boolean},
  isFinished: { type: Boolean },
  participants: [{ type: String }] // Using custom IDs for participants
});



module.exports = mongoose.model('Event', event);
