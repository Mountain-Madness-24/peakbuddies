const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const dotenv = require('dotenv');

dotenv.config();

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['openid', 'email', 'profile'],
    state: true,
  },
  function(accessToken, refreshToken, profile, done) {
    // In a production application, you would want to associate the LinkedIn account with a user record in your database.
    // This example just passes the profile on to the next step
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    
    return done(null, profile);
  }
));

// Serialize user into the sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Deserialize user from the sessions
passport.deserializeUser(function(user, done) {
  done(null, user);
});
