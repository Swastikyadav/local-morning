const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  posts: [{
    type: String,
    ref: "Post",
  }]
});

module.exports = model("Tag", tagSchema);