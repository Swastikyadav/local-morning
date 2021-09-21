const { validationResult } = require("express-validator");

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
}

module.exports = GlobalMiddleWares;