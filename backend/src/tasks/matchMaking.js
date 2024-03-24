const cron = require('node-cron');
const Event = require('../models/event');
const Meeting = require('../models/meeting');
const User = require('../models/user');

async function matchParticipantsAndNotify(event, io) {
  // Assume participants are stored by their ObjectId or a unique identifier in the event.participants
  const participants = await User.find({ '_id': { $in: event.participants } });

  // Simple random matching logic for demonstration. This should be replaced with your actual matching logic.
  while (participants.length >= 2) {
    const match = [participants.pop(), participants.pop()]; // Take two participants out for a meeting

    // Create a new meeting
    const meeting = new Meeting({
      locationName: "Virtual Location", // Example, set accordingly
      locationLatLon: { lat: 0, lon: 0 }, // Example, set accordingly
      startingTime: new Date(), // Set this according to your logic
      icebreakerQuestions: ["Question 1?", "Question 2?"], // Example questions
      eventStatus: "Scheduled",
      membersOfMeeting: match.map(m => m._id), // Storing participant IDs
      isFinished: false,
      isStarted: false,
    });

    await meeting.save();

    // Notify matched participants through socket.io
    match.forEach(member => {
      io.to(member.socketId).emit('meetingNotification', {
        message: 'You have been matched for a meeting!',
        meetingId: meeting._id,
      });
    });
  }
}

// Run every minute to check for events starting
module.exports = function(io) {
  cron.schedule('* * * * * *', async () => { // TODO: Revert back to '* * * * *' for production
    const now = new Date();
    const upcomingEvents = await Event.find({ startDateTime: { $lte: now }, isStarted: false });

    console.log(`"${upcomingEvents.length}" events are starting now!`);

    upcomingEvents.forEach(event => {
      console.log(`Event ${event._id} is starting now!`);
      console.log(`Event details: ${event}`);

      setTimeout(async () => {
        await matchParticipantsAndNotify(event, io); // Implement matching and notification

        // Update the event as started
        await Event.findByIdAndUpdate(event._id, { isStarted: true });
      }, event.intervalOfPing * 60000); // Convert interval to milliseconds
    });
  });
};