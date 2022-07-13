const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {

    callback(null, path.join(__dirname, "../assets/csvfiles"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImages = multer({ storage: storage }).single("file");
// console.log(uploadImages)

module.exports = { uploadImages };
