const mongoose = require('mongoose');

const { Schema } = mongoose;

const hackathonschema = new Schema({
  eventJoinLink: { type: String, required: true },
  adminsOfTheEvent: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Assuming 'User' schema exists for admins
  nameOfEvent: { type: String, required: true },
  description: { type: String, required: true },
  importantLinks: [String], // Array of strings for links
  meetingRooms: [{
    name: String,
    latLong: {
      lat: Number,
      long: Number
    }
  }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  intervalOfPing: Number, // Could be in minutes or seconds, depending on your requirement
  isStarted: { type: Boolean, default: false },
  isFinished: { type: Boolean, default: false }
});

module.exports = mongoose.model('Event', hackathonschema);
