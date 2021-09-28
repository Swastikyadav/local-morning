const Post = require("../models/postModel");
const User = require("../models/userModel");

class PostController {
  static async createPost(req, res, next) {
    try {
      req.body.authorId = req.user.user_id;
      const newPost = await Post.create(req.body);

      await User.findByIdAndUpdate(newPost.authorId, {$push: { postsId: newPost._id }});
      
      res.status(200).json({newPost});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;