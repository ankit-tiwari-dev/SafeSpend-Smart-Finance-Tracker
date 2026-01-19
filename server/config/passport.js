import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import { sendWelcomeEmailViaGmail } from "../utils/googleMailer.js";
import jwt from "jsonwebtoken";

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
// Only initialize GoogleStrategy when credentials are provided
if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CALLBACK_URL
) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const email =
            profile.emails && profile.emails[0] && profile.emails[0].value;
          const name =
            profile.displayName ||
            (profile.name &&
              `${profile.name.givenName} ${profile.name.familyName}`) ||
            "User";
          const profileImageUrl = profile.photos && profile.photos[0] && profile.photos[0].value;

          if (!email)
            return done(new Error("No email found in Google profile"));

          let user = await User.findOne({ email });
          let isNew = false;

          if (user) {
            // Link Google account if not linked
            user.googleId = profile.id;
            user.authProvider = "google";
            if (profileImageUrl) user.profileImageUrl = profileImageUrl;
            await user.save();
          } else {
            // Create new user
            isNew = true;
            user = await User.create({
              fullName: name,
              email,
              googleId: profile.id,
              authProvider: "google",
              profileImageUrl: profileImageUrl || null,
            });
          }

          // Send welcome email only on first creation
          if (isNew) {
            try {
              // Note: This requires GMAIL_SERVICE_ACCOUNT_EMAIL or SMTP config on Render
              await sendWelcomeEmailViaGmail(user);
            } catch (emailErr) {
              console.error("Error triggering welcome email flow:", emailErr);
            }
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
} else {
  console.warn(
    "Google OAuth credentials are not set. Skipping GoogleStrategy initialization. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL to enable Google Sign-In."
  );
}
console.log("Google Callback URL:", process.env.GOOGLE_CALLBACK_URL);

export default passport;
