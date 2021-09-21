const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
  },

  role: {
    type: String,
    enum: ["Admin", "Author", "Reader"],
    default: "Reader",
  }
}, {timestamps: true});

userSchema.pre("save", function(next) {
  if(this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

module.exports = model("User", userSchema);