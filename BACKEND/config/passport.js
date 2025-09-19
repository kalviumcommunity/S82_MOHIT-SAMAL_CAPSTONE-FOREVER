const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://forever-8ecp.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile received:", profile);

        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (!email) {
          console.error("Google profile missing email:", profile);
          return done(new Error("No email found in Google profile"), null);
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName || "",
            email,
            profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : "",
            password: Math.random().toString(36).slice(-12) + "Aa1!", // random strong password
          });
        }

        return done(null, user);
      } catch (err) {
        console.error("Error in Google OAuth callback:", err);
        return done(err, null);
      }
    }
  )
);

// Route example for login
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//   res.redirect('/');
// });
