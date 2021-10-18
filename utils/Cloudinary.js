const cloudinary = require("cloudinary").v2;

class Cloudinary {
  static config(req, res, next) {
    cloudinary.config({ 
      cloud_name: process.env.cloudinary_name, 
      api_key: process.env.cloudinary_api_key, 
      api_secret: process.env.cloudinary_api_secret,
      secure: true
    });

    next();
  }
}

module.exports = Cloudinary;