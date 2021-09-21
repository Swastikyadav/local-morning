class UserController {
  static createUser(req, res, next) {
    res.send("create new user");
  }
}

module.exports = UserController;