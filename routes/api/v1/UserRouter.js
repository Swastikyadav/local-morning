const express = require("express");
const { 
  createUser,
  login,
  verifyUser,
  forgotPassword,
  resetPassword,
  updateProfile,
  currentUserProfile,
  userProfile,
} = require("../../../controller/UserController");
const GlobalMiddleWares = require("../../../middlewares/GlobalmiddleWare");
const UserValidators = require("../../../validators/UserValidators");
const Multer = require("../../../utils/Multer");

const { Router } = express;

class UserRouter {
  constructor() {
    this.router = Router();
    this.postRoutes();
    this.patchRoutes();
    this.getRoutes();
  }

  // Current Authenticated user profile
  getRoutes() {
    this.router.get(
      "/profile",
      GlobalMiddleWares.isLoggedIn,
      currentUserProfile
    );

    this.router.get(
      "/profile/:id",
      UserValidators.userProfile(),
      GlobalMiddleWares.checkError,
      userProfile
    );

    this.router.get(
      "/forgotpassword",
      GlobalMiddleWares.isNotLoggedIn,
      UserValidators.forgotPassword(),
      GlobalMiddleWares.checkError,
      forgotPassword
    );
  }

  postRoutes() {
    this.router.post(
      "/signup",
      GlobalMiddleWares.isNotLoggedIn,
      UserValidators.signUp(),
      GlobalMiddleWares.checkError,
      createUser
    );

    this.router.post(
      "/login",
      GlobalMiddleWares.isNotLoggedIn,
      UserValidators.login(),
      GlobalMiddleWares.checkError,
      login
    );
  }

  patchRoutes() {
    this.router.patch(
      "/verify/:id",
      UserValidators.verifyUser(),
      GlobalMiddleWares.checkError,
      verifyUser
    );

    this.router.patch(
      "/resetpassword/:id",
      GlobalMiddleWares.isNotLoggedIn,
      UserValidators.resetPassword(),
      GlobalMiddleWares.checkError,
      resetPassword
    );

    // Authenticated and Authorized route
    this.router.patch(
      "/update/:id",
      GlobalMiddleWares.isLoggedIn,
      GlobalMiddleWares.isAuthorized,
      Multer.upload().fields([{name: "avatar", maxCount: 1}, {name: "name", maxCount: 1}]),
      updateProfile,
    );
  }
}

module.exports = new UserRouter().router;