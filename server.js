const express = require("express");
const mongoose = require("mongoose");
const getEnvVariable = require("./environments/env");
const UserRouter = require("./routes/api/v1/UserRouter");
const bodyParser = require("body-parser");

module.exports = class Server {
  constructor() {
    this.app = express();
    this.setConfiguration();
    this.setRoutes();
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
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  setRoutes() {
    this.app.use("/api/v1/user", UserRouter)
  }
}