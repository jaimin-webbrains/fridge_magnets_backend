var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const ColorsController = require("../controller/ColorsController");

router.get("/colors/list", ColorsController.getColors);
router.post("/colors/add", auth , ColorsController.addColor);
router.put("/colors/update", auth , ColorsController.updateColor);
router.delete("/colors/delete", auth , ColorsController.deleteColor);

module.exports = router;