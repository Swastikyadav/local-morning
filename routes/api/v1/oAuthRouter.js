const express = require("express");
const { oAuthfailure, oAuthCallback } = require("../../../controller/oAuthController");
const GlobalMiddleWares = require("../../../middlewares/GlobalmiddleWare");
const passport = require("passport");

const { Router } = express;

class OauthRouter {
  constructor() {
    this.router = Router();
    this.getRoutes();
  }

  getRoutes() {
    this.router.get(
      "/failure",
      GlobalMiddleWares.isNotLoggedIn,
      oAuthfailure
    );

    this.router.get(
      "/google",
      GlobalMiddleWares.isNotLoggedIn,
      passport.authenticate('google', { scope: ['profile', 'email']})
    );

    this.router.get(
      "/google/callback",
      passport.authenticate('google', { session: false, failureRedirect: "/failure" }),
      oAuthCallback
    );
  }
}

module.exports = new OauthRouter().router;
