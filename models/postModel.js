const mongoose = require("mongoose");
const { Schema, model, Document } = mongoose;

const Tag = require("../models/tagModel");
// const User = require("../models/userModel");

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
    maxlength: 280,
  },

  image: {
    type: String,
    default: ""
  },

  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],

  tags: [{
    type: Schema.Types.ObjectId,
    ref: "Tag",
  }]
}, {timestamps: true});

postSchema.pre("remove", function(next) {
  this.tags.forEach(async (tag) => {
    await Tag.findByIdAndUpdate(tag._id, {$pull: { posts: this._id }});
  });
  
  next();
});

module.exports = model("Post", postSchema);