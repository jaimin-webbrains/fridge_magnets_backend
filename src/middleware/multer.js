const multer = require("multer");
var fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file", file);
    if (
      file.fieldname === "logo" ||
      file.fieldname === "news_image" ||
      //   file.fieldname === "customer_files" ||
      //   file.fieldname === "customer_images" ||
      //   file.fieldname === "customer_docs"||
      file.fieldname === "brand_image" ||
      file.fieldname === "product_image"
    ) {
      if (!fs.existsSync(process.env.UPLOAD_DIR)) {
        fs.mkdirSync(process.env.UPLOAD_DIR);
      }
      cb(null, `./${process.env.UPLOAD_DIR}`);
    } else {
      let path = "";
      return path;
    }
  },

  filename: (req, file, cb) => {
    let fileExt = file.originalname.split(".").pop();
    cb(
      null,
      Date.now() + "_" + `${file.fieldname}.${fileExt}`.split(" ").join("_")
    );
  },
});

exports.upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "logo") {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        return cb(null, false);
      }
    }

    if (file.fieldname === "news_image") {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        return cb(null, false);
      }
    }


    if (file.fieldname === "product_image") {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        return cb(null, false);
      }
    }

    if (file.fieldname === "brand_image") {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        return cb(null, false);
      }
    }

    // if (file.fieldname === "customer_images") {
    //   if (
    //     file.mimetype == "image/png" ||
    //     file.mimetype == "image/jpg" ||
    //     file.mimetype == "image/jpeg" ||
    //     file.mimetype == "image/gif" ||
    //     file.mimetype == "image/webp"
    //   ) {
    //     cb(null, true);
    //   } else {
    //     return cb(null, false);
    //   }
    // }

    // if (file.fieldname === "customer_files") {
    //   if (
    //     file.mimetype == "application/pdf" ||
    //     file.mimetype == "application/msword" ||
    //     file.mimetype ==
    //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    //     file.mimetype == "text/csv"
    //   ) {
    //     cb(null, true);
    //   } else {
    //     return cb(null, false);
    //   }
    // }

    // if (file.fieldname === "customer_docs") {
    //   if (
    //     file.mimetype == "application/pdf" ||
    //     file.mimetype == "application/msword" ||
    //     file.mimetype ==
    //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    //     file.mimetype == "text/csv" ||
    //     file.mimetype == "image/png" ||
    //     file.mimetype == "image/jpg" ||
    //     file.mimetype == "image/jpeg" ||
    //     file.mimetype == "image/gif" ||
    //     file.mimetype == "image/webp"
    //   ) {
    //     cb(null, true);
    //   } else {
    //     return cb(null, false);
    //   }
    // }
  },
});
