// Correct ES Module import syntax
import { expect } from 'chai';
import { io } from 'socket.io-client';


describe("Socket.IO Tests", () => {
  let socket;

  before((done) => {
    // Connect to the WebSocket server
    socket = io("http://localhost:3000");
    socket.on('connect', done);
  });

  after(() => {
    // Disconnect after tests
    socket.disconnect();
  });

  it("should receive a meeting notification", (done) => {
    socket.on('meetingNotification', (data) => {
      expect(data).to.have.property('message');
      done();
    });

    // Trigger the event that leads to a meeting notification being sent
    // This depends on your server's logic; you may need to simulate the conditions that trigger the notification
  });
});
