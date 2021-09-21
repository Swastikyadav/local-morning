const express = require("express");
const mongoose = require("mongoose");
const getEnvVariable = require("./environments/env");

module.exports = class Server {
  constructor() {
    this.setConfiguration();
  }

  app() {
    return express();
  }

  setConfiguration() {
    this.connectMongoDb();
  }

  connectMongoDb() {
    mongoose.connect(getEnvVariable().dbUrl)
      .then(() => console.log("Connected to MongoDB cloud database"))
  }
}