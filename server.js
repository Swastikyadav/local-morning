const express = require("express");

module.exports = class Server {
  app() {
    return express();
  }
}