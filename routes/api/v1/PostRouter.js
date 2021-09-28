const express = require("express");
const PostValidators = require("../../../validators/PostValidators");
const GlobalMiddleWares = require("../../../middlewares/GlobalmiddleWare");
const { createPost } = require("../../../controller/PostController");

const { Router } = express;

class PostRouter {
  constructor() {
    this.router = Router();
    this.postRoutes();
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWares.isLoggedIn,
      PostValidators.create(),
      GlobalMiddleWares.checkError,
      createPost,
    );
  }

  deleteRoutes() {

  }
}

module.exports = new PostRouter().router;