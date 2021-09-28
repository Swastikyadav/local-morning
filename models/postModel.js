const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
    maxlength: 280,
  },

  // image: {
  //   type: String,
  // },

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

module.exports = model("Post", postSchema);