const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const getEnvVariables = require("../environments/env");

passport.use(new GoogleStrategy({
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleCliendSecret,
    callbackURL: `${getEnvVariables().baseUrl}/api/v1/oAuth/google/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    const user = {
      name: profile.displayName,
      email: profile._json.email,
    }

    User.findOne({email: user.email})
      .then(foundUser => {
        if(foundUser) {
          return cb(null, foundUser);
        } else {
          new User(user).save()
            .then(newUser => {
              console.log(newUser);
              return cb(null, newUser);
            })
            .catch(err => cb(err));
        }
      })
      .catch(err => cb(err));
  }
));