const Post = require("../models/postModel");
const User = require("../models/userModel");
const Tag = require("../models/tagModel");

class PostController {
  static async createPost(req, res, next) {
    try {
      req.body.authorId = req.user.user_id;
      const { content, authorId, tags } = req.body;
      
      const newPost = await Post.create({content, authorId});
      const tagsArray = tags && tags.split(",");
      tags && tagsArray.forEach(async tag => {
        const foundTag = await Tag.findOne({name: tag});
        if (foundTag) {
          await Tag.findByIdAndUpdate(foundTag._id, {$push: { posts: newPost._id }});
          await Post.findByIdAndUpdate(newPost._id, {$push: { tags: foundTag._id }});
        } else {
          const newTag = await Tag.create({name: tag});
          await Tag.findByIdAndUpdate(newTag._id, {$push: { posts: newPost._id }});
          await Post.findByIdAndUpdate(newPost._id, {$push: { tags: newTag._id }});
        }
      });

      await User.findByIdAndUpdate(newPost.authorId, {$push: { postsId: newPost._id }});
      
      res.status(200).json({newPost});
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { postId } = req.params;
      
      const postDoc = await Post.findByIdAndRemove(postId);
      await postDoc.remove();
      
      res.status(200).json({msg: "Post deletion successful"});
    } catch (error) {
      next(error);
    }
  }

  static async likePost(req, res, next) {
    try {
      const { user_id } = req.user;
      const { postId } = req.params;

      const updatedPost = await Post.findByIdAndUpdate(postId, {$push: { likes: user_id }}, {new: true});

      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;