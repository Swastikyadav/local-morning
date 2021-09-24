const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const getEnvVariable = require("../environments/env");
const User = require("../models/userModel");

passport.use(new GoogleStrategy({
    clientID: getEnvVariable().googleClientId,
    clientSecret: getEnvVariable().googleCliendSecret,
    callbackURL: "http://localhost:5000/api/v1/oAuth/google/callback"
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