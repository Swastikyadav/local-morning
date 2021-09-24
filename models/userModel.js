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
    default: "1a2b3c4d"
  },

  role: {
    type: String,
    enum: ["Admin", "Author", "Reader"],
    default: "Reader",
  },

  verified: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true});

userSchema.pre("save", function(next) {
  if(this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

userSchema.methods.validatePassword = function(password) {
  const isMatched = bcrypt.compareSync(password, this.password);

  return isMatched;
}

module.exports = model("User", userSchema);