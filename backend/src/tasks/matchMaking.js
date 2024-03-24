const cron = require('node-cron');
const Event = require('../models/event');
const Meeting = require('../models/meeting');
const User = require('../models/user');

function shuffleArray(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const icebreakerQuestions = [
  "What's the worst job you've ever had?", 
  "What color is your Bugahtti?",
  "If you were a worm, would you still love me?",
  "What is your favourite project you've worked on?",
  "What technology or tool are you hoping to learn more about during this hackathon?",
  "What's your favorite programming language or technology, and why?",
  "What's your 'pump-up' music for coding or working on tech projects?",
];

async function matchParticipantsAndNotify(event, io, map_socket_to_user) {
  // Assume participants are stored by their ObjectId or a unique identifier in the event.participants
  const usersInEvent = await User.find({ 'userId': { $in: event.participants }, availability: true });

  // shuffle participants
  participants = shuffleArray(usersInEvent);

  // for all participants, find their socket add it to their info
  participants.forEach(participant => {
    participant.socketId = map_socket_to_user[participant.userId];
  });

  const numMeetingRooms = event.meetingRooms.length;
  const randomMeetingRoom = event.meetingRooms[Math.floor(Math.random() * numMeetingRooms)];

  const locationName = randomMeetingRoom.name;
  const loactionInfo = randomMeetingRoom.latLong;

  const subsetOfQuetions = shuffleArray(icebreakerQuestions).slice(0, 3); // Get first 3 questions

  console.log(participants);
  while (participants.length >= 2) {
    const match = [participants.pop(), participants.pop()]; // Take two participants out for a meeting

    // Create a new meeting
    const meeting = new Meeting({
      locationName: locationName, // Example, set accordingly
      locationLatLon: {
        lat: loactionInfo.lat,
        lon: loactionInfo.long
      }, // Example, set accordingly
      startingTime: new Date(), // Set this according to your logic
      icebreakerQuestions: subsetOfQuetions, // Example questions
      eventStatus: "Scheduled",
      membersOfMeeting: match.map(m => m.userId), // Storing participant IDs
      isFinished: false,
      isStarted: false,
    });

    await meeting.save();

    // Notify matched participants through socket.io
    match.forEach(member => {
      io.to(member.socketId).emit('meetingNotification', {
        message: 'You have been matched for a meeting!',
        meetingId: meeting._id,
        meetingDetails: meeting,
      });
    }); // TODO: FRONTEND: Listen for 'meetingNotification' event

    /*
    TODO: FRONTEND: Sample meetingNotification event
    {
      message: 'You have been matched for a meeting!',
      meetingId: '65ffb801d9187b167281ec19',
      meetingDetails: {
        locationName: 'Virtual Location',
        locationLatLon: { lat: 0, lon: 0 },
        startingTime: '2024-03-24T05:20:01.840Z',
        icebreakerQuestions: [ 'Question 1?', 'Question 2?' ],
        eventStatus: 'Scheduled',
        membersOfMeeting: [ '65ff8649ba73be12dae62eba', '65ff82f6cc052715279760c6' ],
        isFinished: false,
        isStarted: false,
        _id: '65ffb801d9187b167281ec19',
        __v: 0
      }
    }
    */
  }
}

// Run every minute to check for events starting
module.exports = function(io, map_socket_to_user) {
  cron.schedule('* * * * *', async () => { // TODO: Revert back to '* * * * *' for production
    // get current time, in UTC
    let now = new Date();
    now = now.toUTCString();
    const upcomingEvents = await Event.find({ startDate: { $lte: now }});

    console.log(`Found ${upcomingEvents.length} events starting now!`);
    upcomingEvents.forEach( async (event) => {
      console.log(`Event ${event._id} is starting now!`);
      console.log(`Event details: ${event}`);

      setTimeout(async () => {
        console.log(`Matching participants for event ${event._id}...`)
        await matchParticipantsAndNotify(event, io, map_socket_to_user); // Implement matching and notification
      }, 1000); // Convert interval to milliseconds


      // Update the event as started
      await Event.findByIdAndUpdate(event._id, { isStarted: false }); // TODO: Change to true
    });
  });
};