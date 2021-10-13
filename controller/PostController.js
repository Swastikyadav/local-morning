const Post = require("../models/postModel");
const User = require("../models/userModel");
const Tag = require("../models/tagModel");

class PostController {
  static async createPost(req, res, next) {
    try {
      req.body.authorId = req.user.user_id;
      const { content, authorId, tags } = req.body;
      const { image } = req.files;
      
      const newPost = await Post.create({
        content,
        image: `http://localhost:5000/${image[0].path}`,
        authorId
      });
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

      const post = await Post.findById(postId);
      const alreadyLiked = post.likes.includes(user_id);

      if(!alreadyLiked) {
        await Post.findByIdAndUpdate(postId, {$push: { likes: user_id }});
      } else {
        await Post.findByIdAndUpdate(postId, {$pull: { likes: user_id }});
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;