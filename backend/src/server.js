const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const cors = require('cors'); // Require the cors package

require('./config/passport'); // Import passport configuration
require('dotenv').config();
const matchMaking = require('./tasks/matchMaking'); // Import the match making task


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: true, // Allow any origin
  credentials: true, // Allow cookies to be sent from the frontend
}));

// Connect to MongoDB
connectDB();

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/event', require('./routes/event'));
app.use('/user', require('./routes/userRoute'));
app.use('/meetings', require('./routes/meetings'));

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Listen for disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });

  // Here you can listen for other events and emit messages to clients
});

matchMaking(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});