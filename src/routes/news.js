var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");
const NewsController = require("../controller/NewsController");

router.get("/news/list", NewsController.getNews);
router.post("/news/add", auth, upload.single("news_image"),NewsController.addNews);
router.put("/news/update", auth ,upload.single("news_image"), NewsController.updateNews);
router.delete("/news/delete", auth , NewsController.deleteNews);

module.exports = router;