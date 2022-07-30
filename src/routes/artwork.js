var express = require("express");
var router = express.Router();
const { upload } = require("../middleware/multer");
const SettingController = require("../controller/SettingController");
const auth = require("../middleware/auth");
const ArtworkController = require("../controller/ArtworkController");

router.get("/artworks/list", ArtworkController.getartwork);
// router.post("/setting/add", SettingController.adrsdsetting);
router.put(
  "/artwork/update",
  auth,
  upload.array("file"),
  ArtworkController.updateArtwork
);
// router.delete("/brands/delete", BrandsController.deleteBrand);

module.exports = router;
