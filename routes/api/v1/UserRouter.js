const express = require("express");
const { createUser, login, verifyUser, forgotPassword, resetPassword } = require("../../../controller/UserController");
const GlobalMiddleWares = require("../../../middlewares/GlobalmiddleWare");
const UserValidators = require("../../../validators/UserValidators");

const { Router } = express;

class UserRouter {
  constructor() {
    this.router = Router();
    this.postRoutes();
    this.patchRoutes();
    this.getRoutes();
  }

  getRoutes() {
    this.router.get(
      "/forgotpassword",
      UserValidators.forgotPassword(),
      GlobalMiddleWares.checkError,
      forgotPassword
    );
  }

  postRoutes() {
    this.router.post(
      "/signup",
      UserValidators.signUp(),
      GlobalMiddleWares.checkError,
      createUser
    );

    this.router.post(
      "/login",
      UserValidators.login(),
      GlobalMiddleWares.checkError,
      login
    );
  }

  patchRoutes() {
    // Authorized Route - Verify Jwt Token
    this.router.patch(
      "/verify/:id",
      UserValidators.verifyUser(),
      GlobalMiddleWares.checkError,
      verifyUser
    );

    this.router.patch(
      "/resetpassword/:id",
      UserValidators.resetPassword(),
      GlobalMiddleWares.checkError,
      resetPassword
    );
  }
}

module.exports = new UserRouter().router;