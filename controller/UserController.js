const User = require("../models/userModel");

class UserController {
  static async createUser(req, res, next) {
    const { email, name, password, role } = req.body;

    const data = {email, name, password, role};

    try {
      const newUser = await new User(data).save();
      res.status(200).send({newUser, msg: "New user account created"});
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = UserController;