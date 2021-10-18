const express = require("express");
const mongoose = require("mongoose");
const getEnvVariable = require("./environments/env");
const UserRouter = require("./routes/api/v1/UserRouter");
const oAuthRouter = require("./routes/api/v1/oAuthRouter");
const PostRouter = require("./routes/api/v1/PostRouter");
const NewsRouter = require("./routes/api/v1/NewsRouter");
const path = require("path");
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
    // Have Node serve the files for our built React app
    this.app.use("/static", express.static(path.resolve(__dirname, "./client/public"))); 

    this.app.use("/uploads", express.static("uploads"));
    this.app.use("/api/v1/user", UserRouter);
    this.app.use("/api/v1/oAuth", oAuthRouter);
    this.app.use("/api/v1/post", PostRouter);
    this.app.use("/api/v1/news", NewsRouter);

    // All other get request not handled before will return our React app
    this.app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "./client/public", "index.html"));
    });
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