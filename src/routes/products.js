var express = require("express");
var router = express.Router();
const { upload } = require("../middleware/multer");
const ProductsController = require("../controller/ProductsController");

router.get("/products/list", ProductsController.getProducts);
router.post("/product/getById", ProductsController.getEditProduct);
router.post(
  "/products/add",
  upload.fields([{ name: "product_image" },{name:"brand_image"}]),
  ProductsController.addProduct
);
router.put(
  "/products/update/:id",
  upload.fields([{ name: "product_image"},{name:"brand_image"}]),
  ProductsController.updateProduct
);
router.delete("/products/delete", ProductsController.deleteProduct);

module.exports = router;
