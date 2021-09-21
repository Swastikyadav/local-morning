const express = require("express");
const mongoose = require("mongoose");
const getEnvVariable = require("./environments/env");
const UserRouter = require("./routes/api/v1/UserRouter");

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
    this.app.use("/api/v1/user", UserRouter)
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