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
      next(new Error("Already logged in, Log out to perform this action"));
    }
  }

  static isLoggedIn(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.slice(7, authHeader.length) : null;

    if(token) {
      // Verify Jwt token and get decoded user out of it.
      jwt.verify(token, getEnvVariable().jwtSecret, (err, decoded) => {
        if(err) {
          next(err);
          return;
        }

        req.user = decoded;
        next();
      });
    } else {
      next(new Error("UnAuthenticated Access!"));
    }
  }

  static isAuthorized(req, res, next) {
    const { user_id } = req.user;
    const { id } = req.params;

    if(user_id === id) {
      next();
    } else {
      next(new Error("UnAuthorized Access!"));
    }
  }
}

module.exports = GlobalMiddleWares;