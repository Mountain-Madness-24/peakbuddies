const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

// linkedin strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['openid', 'email', 'profile'],
    state: true,
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log('profile', profile);

    try {
        let user = await User.findOne({userID: profile.id});
        
        if (!user) {
            const details = {
                userID: profile.id,
                firstName: profile.givenName,
                lastName: profile.familyName,
                email: profile.email,
                picture: profile.picture,
            };

            user = await new User(details).save();
        }

        return done(null, user);
    } catch (error) {
        console.log('error', error);
        return done(error);
    }

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
