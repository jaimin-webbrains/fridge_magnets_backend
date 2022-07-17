var express = require("express");
var router = express.Router();
// const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");
const GallerysController = require("../controller/GallerysController");

router.get("/gallerys/list", GallerysController.getGallerys);
router.post("/gallery/list", GallerysController.getGallery);
router.post(
  "/gallerys/add",
  upload.array("product_Images"),
  GallerysController.addGallery
);
// router.put("/gallerys/update", upload.array("product_Images"),GallerysController.updateGallery);
router.delete("/gallerys/delete", GallerysController.deleteGallery);

module.exports = router;
