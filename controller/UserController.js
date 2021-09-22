const User = require("../models/userModel");
const { generateToken } = require("../middlewares/GlobalmiddleWare");

class UserController {
  static async createUser(req, res, next) {
    const { email, name, password, role } = req.body;

    const data = {email, name, password, role};

    try {
      const newUser = await new User(data).save();

      // Send verification email

      res.status(200).json({newUser, msg: "New user account created"});
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({email});

      if(user.validatePassword(password)) {
        const jwtToken = generateToken({user_id: user._id, email});
        
        res.status(200).json({
          jwtToken,
          user
        });
      } else {
        next(new Error("Password is incorrect!"));
      }
    } catch (error) {
      next(error);
    }     
  }

  static async verifyUser(req, res, next) {
    try {
      const { email } = req.body;
      const verifiedUser = await User.findOneAndUpdate({email}, {verified: true}, {new: true});

      res.status(200).json({verifiedUser, msg: "User account is now verified"});
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const user = await User.findOne({email});

      // Send password reset link to email

      res.status(200).json({msg: "Password reset link sent to email"});
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { newPassword } = req.body;
      const { id } = req.params;

      const updatedUser = await User.findByIdAndUpdate(id, {password: newPassword}, {new: true});
      await updatedUser.save();

      res.status(200).json({updatedUser, msg: "Password updated successful"});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;