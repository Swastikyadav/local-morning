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
        image: image ? `http://localhost:5000/${image[0].path}` : "",
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

      const updatedUser = await User.findByIdAndUpdate(newPost.authorId, {$push: { postsId: newPost._id }}, {new: true}).populate("postsId");
      
      res.status(200).json({newPost, updatedUser, success: true});
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { postId } = req.params;
      const { user_id } = req.user;
      
      const postDoc = await Post.findByIdAndRemove(postId);
      const updatedUser = await User.findByIdAndUpdate(user_id, {$pull: { postsId: postDoc._id }})
      .populate({
        path: "postsId",
        populate: { path: "authorId" }
      })
      .populate({
        path: "likedPosts",
        populate: { path: "authorId" }
      });

      await postDoc.remove();
      
      res.status(200).json({updatedUser, message: "Post deletion successful", success: true});
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

      let updatedUser = {}
      let updatedPost = {}
      if(!alreadyLiked) {
        updatedPost = await Post.findByIdAndUpdate(postId, {$push: { likes: user_id }}, {new: true});
        updatedUser = await User.findByIdAndUpdate(user_id, {$push: { likedPosts: post._id }}, {new: true})
        .populate({
          path: "postsId",
          populate: { path: "authorId" }
        })
        .populate({
          path: "likedPosts",
          populate: { path: "authorId" }
        });
      } else {
        updatedPost = await Post.findByIdAndUpdate(postId, {$pull: { likes: user_id }}, {new: true});
        updatedUser = await User.findByIdAndUpdate(user_id, {$pull: { likedPosts: post._id }}, {new: true})
        .populate({
          path: "postsId",
          populate: { path: "authorId" }
        })
        .populate({
          path: "likedPosts",
          populate: { path: "authorId" }
        });
      }

      res.status(200).json({updatedPost, updatedUser, success: true});
    } catch (error) {
      next(error);
    }
  }

  static async allPosts(req, res, next) {
    try {
      Post.find({}).sort("-createdAt").populate({path: "authorId"}).exec((err, posts) => {
        if(err) {next(err)};
        res.status(200).json({posts, success: true});
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;