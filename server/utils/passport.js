
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

if (existingUser) {
  return done(null, existingUser); // Login
}

//  Check if user already exists by email
const userByEmail = await User.findOne({ email: profile.emails[0].value });
if (userByEmail) {
  // Link Google ID to existing account
  userByEmail.googleId = profile.id;
  await userByEmail.save();
  return done(null, userByEmail);
}

// Create a new user
const newUser = new User({
  googleId: profile.id,
  name: profile.displayName,
  email: profile.emails[0].value,
  avatar: profile.photos[0].value,
});
await newUser.save();
return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});
