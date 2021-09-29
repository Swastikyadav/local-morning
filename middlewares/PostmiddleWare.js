const Post = require("../models/postModel");

class PostMiddleWares {
  static async isAuthorized(req, res, next) {
    try {
      const { user_id } = req.user;
      const { postId } = req.params;

      const { authorId } = await Post.findById(postId);

      if(authorId && user_id == authorId) {
        next();
      } else {
        next(new Error("UnAuthorized Access!"));
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostMiddleWares;