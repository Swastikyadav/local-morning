const User = require("../models/userModel");
const { generateToken } = require("../middlewares/GlobalmiddleWare");
const NodeMailer = require("../utils/NodeMailer");
const getEnvVariable = require("../environments/env");
const Multer = require("../utils/Multer");
const cloudinary = require("cloudinary").v2;

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

      res.status(200).json({newUser, msg: "New user account created", success: true});
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
          user,
          success: true
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
        html: `<p>Hello ${user.name}, Here is your password reset link: <a href="${getEnvVariable().frontEndBaseUrl}/resetPassword/${user._id}">Reset Your Password</a> <small>${user._id}</small>`,
      });

      res.status(200).json({message: "Password reset link sent to email", success: true});
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

      res.status(200).json({updatedUser, message: "Password updated successful", success: true});
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { name, bio } = req.body;
      const { avatar } = req.files;
      let data = { name, bio }

      if(avatar) {
        const file = Multer.dataUri(req).content;
        const result = await cloudinary.uploader.upload(file);

        data.avatar = result.url;
      }

      const updatedUser = await User.findOneAndUpdate({email: req.user.email}, data, {new: true}).populate({
        path: "postsId",
        populate: { path: "authorId" }
      })
      .populate({
        path: "likedPosts",
        populate: { path: "authorId" }
      });
      res.status(200).json({updatedUser, success: true});
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req, res, next) {
    try {
      const { newPassword } = req.body;
      const { user_id } = req.user;

      const updatedUser = await User.findByIdAndUpdate(user_id, {password: newPassword}, {new: true})
      .populate({
        path: "postsId",
        populate: { path: "authorId" }
      })
      .populate({
        path: "likedPosts",
        populate: { path: "authorId" }
      });
      await updatedUser.save();

      res.status(200).json({updatedUser, success: true});
    } catch (error) {
      next(error);
    }
  }

  static async currentUserProfile(req, res, next) {
    try {
      const { email } = req.user;
      const user = await User.findOne({email}).populate({
        path: "postsId",
        populate: {
          path: "authorId"
        }
      }).populate({
        path: "likedPosts",
        populate: {
          path: "authorId"
        }
      });
      res.status(200).json({user, success: true});
    } catch (error) {
      next(error);
    }
  }

  static async userProfile(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate("postsId");

      res.status(200).json({user, success: true});
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      
      const userDoc = await User.findByIdAndRemove(id);
      await userDoc.remove();

      res.status(200).json({msg: "User deletion successful"});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;