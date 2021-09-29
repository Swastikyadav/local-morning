const express = require("express");
const PostValidators = require("../../../validators/PostValidators");
const GlobalMiddleWares = require("../../../middlewares/GlobalmiddleWare");
const PostMiddleWares = require("../../../middlewares/PostmiddleWare");
const { createPost, deletePost, likePost } = require("../../../controller/PostController");

const { Router } = express;

class PostRouter {
  constructor() {
    this.router = Router();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
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

  patchRoutes() {
    this.router.patch(
      "/like/:postId",
      GlobalMiddleWares.isLoggedIn,
      likePost
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete/:postId",
      GlobalMiddleWares.isLoggedIn,
      PostMiddleWares.isAuthorized,
      deletePost
    );
  }
}

module.exports = new PostRouter().router;