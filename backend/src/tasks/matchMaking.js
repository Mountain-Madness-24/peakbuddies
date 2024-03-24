const cron = require('node-cron');
const Event = require('../models/event');
// Assume a Meeting model and notification mechanism exists
// const { createMeetingsForEvent, notifyParticipants } = require('../utils/meetingUtils');

// Run every minute to check for events starting
module.exports = function(io) {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const upcomingEvents = await Event.find({ startDateTime: { $lte: now }, isStarted: false });

    console.log(`"${upcomingEvents.length}" events are starting now!`);

    upcomingEvents.forEach(event => {
      console.log(`Event ${event._id} is starting now!`);
      console.log(`Event details: ${event}`);

      setTimeout(async () => {
        // Logic to notify participants using io
        io.emit('meetingNotification', { message: 'New meeting available soon!', event });

        // Update the event as started
        await Event.findByIdAndUpdate(event._id, { isStarted: true });
      }, event.intervalOfPing * 60000); // Convert interval to milliseconds
    });
  });
};