var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const BrandsController = require("../controller/BrandsController");

router.get("/brands/list", BrandsController.getBrands);
router.post("/brands/add", auth, BrandsController.addBrand);
router.put("/brands/update", auth, BrandsController.updateBrand);
router.delete("/brands/delete", auth, BrandsController.deleteBrand);

module.exports = router;