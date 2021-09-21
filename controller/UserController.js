const User = require("../models/userModel");
const { generateToken } = require("../middlewares/GlobalmiddleWare");

class UserController {
  static async createUser(req, res, next) {
    const { email, name, password, role } = req.body;

    const data = {email, name, password, role};

    try {
      const newUser = await new User(data).save();
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
}

module.exports = UserController;