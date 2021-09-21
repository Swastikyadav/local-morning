const express = require("express");
const { createUser } = require("../../../controller/UserController");

const { Router } = express;

class UserRouter {
  constructor() {
    this.router = Router();
    this.postRoutes();
  }

  postRoutes() {
    this.router.post("/signup", createUser)
  }
}

module.exports = new UserRouter().router;