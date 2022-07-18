var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const SizesController = require("../controller/SizesController");

router.get("/sizes/list", SizesController.getSizes);
router.post("/sizes/add", auth , SizesController.addSize);
router.put("/sizes/update", auth ,SizesController.updateSize);
router.delete("/sizes/delete", auth ,SizesController.deleteSize);

module.exports = router;