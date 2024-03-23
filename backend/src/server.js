const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');

require('./config/passport'); // Import passport configuration
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Session configuration
app.use(session({
  secret: 'secret', // Replace with a real secret in production
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/userRoute'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
