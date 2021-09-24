const User = require("../models/userModel");
const { generateToken } = require("../middlewares/GlobalmiddleWare");

class OauthController {
  static oAuthfailure(req, res, next) {
    try {
      res.status(500).json({msg: "Something went wrong, please try again"});
    } catch (err) {
      next(err);
    }
  }

  static oAuthCallback(req, res) {
    // Successful authentication, redirect home.
    const { _id, email } = req.user;
    const jwtToken = generateToken({user_id: _id, email});

    // res.redirect(`/frontendroute?jwtToken={jwtToken}`);
    res.send(`Google Auth Successful, Redirect with jwt token in url as query param, Jwt Token: ${jwtToken}`);
  }
}

module.exports = OauthController;