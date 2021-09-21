const expressValidator = require("express-validator");
const User = require("../models/userModel");
const { body } = expressValidator;

class UserValidators {
  static signUp() {
    return [
      body("name", "Name is required").isString(),
      body("email", "Invalid Email").isEmail().custom((email, {req}) => {
        return User.findOne({email})
          .then(user => {
            if(user) {
              throw new Error("Email already exists!");
            }

          return true;
          })
      }),
      body("password").not()
        .isEmpty().withMessage("Password is required")
        .isAlphanumeric().withMessage("Only AlphaNumeric characters are allowed")
        .isLength({min: 6, max: 18}).withMessage("Password must to 6-18 characters"),
    ];
  }

  static login() {
    return [
      body("email", "Invalid Email").isEmail().custom((email, {req}) => {
        return User.findOne({email})
          .then(user => {
            if(!user) {
              throw new Error("Email does not exist, Please signup");
            }

          return true;
          })
      }),
      body("password").not()
        .isEmpty().withMessage("Password is required")
        .isAlphanumeric().withMessage("Only AlphaNumeric characters are allowed")
        .isLength({min: 6, max: 18}).withMessage("Password must to 6-18 characters"),
    ];
  }
}

module.exports = UserValidators;