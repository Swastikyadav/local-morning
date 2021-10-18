const User = require("../models/userModel");
const { generateToken } = require("../middlewares/GlobalmiddleWare");
const getEnvVariable = require("../environments/env");

class OauthController {
  static oAuthfailure(req, res, next) {
    try {
      res.status(500).json({msg: "Something went wrong, please try again"});
    } catch (err) {
      next(err);
    }
  }

  static oAuthCallback(req, res) {
    const { _id, email } = req.user;
    const jwtToken = generateToken({user_id: _id, email});

    // Redirect to frontend
    res.redirect(`${getEnvVariable().frontEndBaseUrl}/oAuth?t=${jwtToken}`);
  }
}

module.exports = OauthController;