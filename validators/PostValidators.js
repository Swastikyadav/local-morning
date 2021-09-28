const expressValidator = require("express-validator");
const { body } = expressValidator;

class PostValidators {
  static create() {
    return [
      body("content").not()
        .isEmpty().withMessage("Content is required")
        .isLength({max: 280}).withMessage("Maximum 280 characters are allowed")
    ];
  }
}

module.exports = PostValidators;