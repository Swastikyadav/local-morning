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
      GlobalMiddleWares.isNotLoggedIn,
      UserValidators.forgotPassword(),
      GlobalMiddleWares.checkError,
      forgotPassword
    );
  }

  postRoutes() {
    this.router.post(
      "/signup",
      GlobalMiddleWares.isNotLoggedIn,
      UserValidators.signUp(),
      GlobalMiddleWares.checkError,
      createUser
    );

    this.router.post(
      "/login",
      GlobalMiddleWares.isNotLoggedIn,
      UserValidators.login(),
      GlobalMiddleWares.checkError,
      login
    );
  }

  patchRoutes() {
    this.router.patch(
      "/verify/:id",
      UserValidators.verifyUser(),
      GlobalMiddleWares.checkError,
      verifyUser
    );

    this.router.patch(
      "/resetpassword/:id",
      GlobalMiddleWares.isNotLoggedIn,
      UserValidators.resetPassword(),
      GlobalMiddleWares.checkError,
      resetPassword
    );
  }
}

module.exports = new UserRouter().router;