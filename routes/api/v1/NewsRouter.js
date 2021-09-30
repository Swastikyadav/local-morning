const express = require("express");
const { Router } = express;
const GloblMiddleWares = require("../../../middlewares/GlobalmiddleWare");
const { getNews } = require("../../../controller/NewsController");

class NewsRouter {
  constructor() {
    this.router = Router();
    this.getRoutes();
  }

  getRoutes() {
    this.router.get(
      "/",
      GloblMiddleWares.isLoggedIn,
      getNews
    );
  }
}

module.exports = new NewsRouter().router;