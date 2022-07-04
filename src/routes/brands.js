var express = require("express");
var router = express.Router();
// const auth = require("../middleware/auth");
const BrandsController = require("../controller/BrandsController");

router.get("/brands/list", BrandsController.getBrands);
router.post("/brands/add", BrandsController.addBrand);
router.put("/brands/update", BrandsController.updateBrand);
router.delete("/brands/delete", BrandsController.deleteBrand);

module.exports = router;