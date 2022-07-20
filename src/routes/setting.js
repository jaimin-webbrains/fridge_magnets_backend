var express = require("express");
var router = express.Router();
const { upload } = require("../middleware/multer");
const SettingController = require("../controller/SettingController");
const auth = require("../middleware/auth");

router.get("/setting/list", SettingController.getSetting);
// router.post("/setting/add", SettingController.adrsdsetting);
router.put( 
  "/setting/update",
  auth,
  upload.single("logo"),
  SettingController.updatesetting
);
// router.delete("/brands/delete", BrandsController.deleteBrand);

module.exports = router;
