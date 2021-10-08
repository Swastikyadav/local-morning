const expressValidator = require("express-validator");
const User = require("../models/userModel");
const { body, param } = expressValidator;

class UserValidators {
  static signUp() {
    return [
      body("name").not()
        .isEmpty().withMessage("Name is required")
        .isString(),
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

  static verifyUser() {
    return [
      param("id").custom((id, {req}) => {
        return User.findOne({_id: id})
          .then(user => {
            if(!user) {
              throw new Error("User does not exist, Please signup");
            }
          
            if(user.verified) {
              throw new Error("User is already verified");
            } 

            return true;
          })
      }),
    ];
  }

  static forgotPassword() {
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
    ];
  }

  static resetPassword() {
    return [
      body("newPassword").not()
        .isEmpty().withMessage("Password is required")
        .isAlphanumeric().withMessage("Only AlphaNumeric characters are allowed")
        .isLength({min: 6, max: 18}).withMessage("Password must to 6-18 characters"),
      body("confirmNewPassword").not()
        .isEmpty().withMessage("Password confirmation is required")
        .isAlphanumeric().withMessage("Only AlphaNumeric characters are allowed")
        .isLength({min: 6, max: 18}).withMessage("Password must to 6-18 characters")
        .custom((confirmNewPassword, { req }) => {
          if(confirmNewPassword === req.body.newPassword) {
            return true;
          } else {
            req.errorStatus = 422;
            throw new Error("Password and Confirm password does not match");
          }
        }),
    ];
  }

  static userProfile() {
    return [
      param("id").custom((id, {req}) => {
        return User.findOne({_id: id})
          .then(user => {
            if(!user) {
              console.log("no user");
              throw new Error("User not found");
            }

            return true;
          })
      }),
    ];
  }
}

module.exports = UserValidators;