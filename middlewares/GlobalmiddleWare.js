const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const getEnvVariable = require("../environments/env");

class GlobalMiddleWares {
  static checkError(req, res, next) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const newErr = new Error(error.array()[0].msg);
      next(newErr);
      return;
    }

    next();
  }

  static generateToken(payload) {
    return jwt.sign(payload, getEnvVariable().jwtSecret);
  }
}

module.exports = GlobalMiddleWares;