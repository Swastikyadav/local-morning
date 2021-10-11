const express = require("express");
const { Router } = express;
const GloblMiddleWares = require("../../../middlewares/GlobalmiddleWare");
const { getNews, getTopHeadlines } = require("../../../controller/NewsController");

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

    this.router.get(
      "/topheadlines",
      GloblMiddleWares.isLoggedIn,
      getTopHeadlines
    );
  }
}

module.exports = new NewsRouter().router;