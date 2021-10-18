const multer = require("multer");
const DataUri = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const dUri = new DataUri();

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

class Multer {
  static upload() {
    return multer({storage, fileFilter});
  }

  static dataUri(req) {
    const { avatar, image } = req.files;
    const file = avatar ? avatar[0] : image[0];

    return dUri.format(
      path.extname(file.originalname).toString(),
      file.buffer
    );
  }
}

module.exports = Multer;