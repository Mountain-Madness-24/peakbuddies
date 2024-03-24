const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  linkedinLink: String,
  userId: { type: String, required: true }, // Made userId required

  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  pictures: [String], // Array of URLs or paths to image files
  peopleMet: [String], // Array of names or identifiers
  interestTags: [String], // Array of interest tags
  isOrganizer: Boolean,
  bioForAdmins: String,
  contactInfoForAdmins: {
    phone: String,
    email: String
  }, // Adjust based on what info you have
  availability: {type: Boolean, default: false},
  education: String,
  events: [{ type: String, ref: 'event' }], // Using custom IDs for participants
});

module.exports = mongoose.model('User', userSchema);
