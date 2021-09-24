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

  static isNotLoggedIn(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.slice(7, authHeader.length) : null;

    if (!token) {
      next();
    } else {
      res.status(400).json({msg: "This action is only available if logged out."});
    }
  }

  static isLoggedIn(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.slice(7, authHeader.length) : null;

    if(token) {
      // Verify Jwt token and get decoded user out of it.
    } else {
      res.status(400).json({msg: "UnAuthorized Access!"});
    }
  }
}

module.exports = GlobalMiddleWares;