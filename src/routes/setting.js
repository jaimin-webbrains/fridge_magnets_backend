var express = require("express");
var router = express.Router();
const { upload } = require("../middleware/multer");
const SettingController = require("../controller/SettingController");

router.get("/setting/list", SettingController.getSetting);
// router.post("/setting/add", SettingController.adrsdsetting);
router.put(
  "/setting/update",
  upload.single("logo"),
  SettingController.updatesetting
);
// router.delete("/brands/delete", BrandsController.deleteBrand);

module.exports = router;
