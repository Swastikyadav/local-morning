const express = require("express");
const mongoose = require("mongoose");
const getEnvVariable = require("./environments/env");
const UserRouter = require("./routes/api/v1/UserRouter");
const oAuthRouter = require("./routes/api/v1/oAuthRouter");
const PostRouter = require("./routes/api/v1/PostRouter");
const NewsRouter = require("./routes/api/v1/NewsRouter");
const passport = require("passport");
require("./oAuth/passportSetup");

module.exports = class Server {
  constructor() {
    this.app = express();
    this.setConfiguration();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfiguration() {
    this.connectMongoDb();
    this.configureBodyParser();
    this.app.use(passport.initialize());
  }

  connectMongoDb() {
    mongoose.connect(getEnvVariable().dbUrl)
      .then(() => console.log("Connected to MongoDB cloud database"))
  }

  configureBodyParser() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
  }

  setRoutes() {
    this.app.use("/uploads", express.static("uploads"));
    this.app.use("/api/v1/user", UserRouter);
    this.app.use("/api/v1/oAuth", oAuthRouter);
    this.app.use("/api/v1/post", PostRouter);
    this.app.use("/api/v1/news", NewsRouter);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Not Found",
        status_code: 404,
      })
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Something Went Wrong, Please Try Again",
        status_code: errorStatus,
      })
    })
  }
}