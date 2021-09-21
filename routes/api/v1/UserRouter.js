const express = require("express");
const { createUser, login } = require("../../../controller/UserController");
const GlobalMiddleWares = require("../../../middlewares/GlobalmiddleWare");
const UserValidators = require("../../../validators/UserValidators");

const { Router } = express;

class UserRouter {
  constructor() {
    this.router = Router();
    this.postRoutes();
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
}

module.exports = new UserRouter().router;