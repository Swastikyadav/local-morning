const User = require("../models/userModel");
const { generateToken } = require("../middlewares/GlobalmiddleWare");
const NodeMailer = require("../utils/NodeMailer");

class UserController {
  static async createUser(req, res, next) {
    const { email, name, password, role } = req.body;

    const data = {email, name, password, role};

    try {
      const newUser = await new User(data).save();

      // Send verification email
      await NodeMailer.sendEmail({
        to: [email],
        subject: "Email Verification",
        html: `<p>Hello ${name}, Please verify your account here: <a href="https://frontend-verification-link.app?user_id=${newUser._id}">Verification Link</a> <small>${newUser._id}</small>`,
      });

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
      const { id } = req.params;
      const verifiedUser = await User.findByIdAndUpdate(id, {verified: true}, {new: true});

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
      await NodeMailer.sendEmail({
        to: [email],
        subject: "Password Reset Link",
        html: `<p>Hello ${user.name}, Here is your password reset link: <a href="https://frontend-password-reset-link.app?user_id=${user._id}">Reset Your Password</a> <small>${user._id}</small>`,
      });

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

  static async updateProfile(req, res, next) {
    try {
      const { name } = req.body;
      const { avatar } = req.files;
      let data;

      if (avatar && name ) {
        data = {
          avatar: `http://localhost:5000/${avatar[0].path}`,
          name,
        }
      } else if(avatar && !name) {
        data = {avatar: `http://localhost:5000/${avatar[0].path}`}
      } else if(name && !avatar) {
        data = {name}
      }

      const updatedUser = await User.findOneAndUpdate({email: req.user.email}, data, {new: true});
      res.status(200).json({updatedUser, msg: "User updated successfuly"});
    } catch (error) {
      next(error);
    }
  }

  static async profile(req, res, next) {
    try {
      const { email } = req.user;
      const user = await User.findOne({email});
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;