import { io } from 'socket.io-client';
import { expect } from 'chai';


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('Tests starting...');

describe("Socket.IO Tests", function() {
  let socket;

  before(function(done) {
    socket = io(process.env.SERVER_URL || 'http://localhost:3000');
    socket.on('connect', () => {
      console.log('Connected to server!');
    });

    socket.emit('userLogin', 'KmrdadwAHJ');
    done();
  });

  it("should receive a meeting notification", function(done) {

    socket.on('meetingNotification', (data) => {
      try {
        expect(data).to.have.property('message');

        console.log(data)
        done(); // Test passed, notify Mocha
      } catch (error) {
        done(error); // Test failed, pass error to Mocha
      }
    });

    this.timeout(60000); // Extending timeout for async test

    // Simulate conditions that lead to a meetingNotification being emitted.
    // Since this example waits for an external event, ensure the server-side logic triggers the event within the timeout period.
  });

  after(function() {
    console.log('Disconnecting from server!');
    socket.disconnect();
  });
});
