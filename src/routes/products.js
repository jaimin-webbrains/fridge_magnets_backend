var express = require("express");
var router = express.Router();
const { upload } = require("../middleware/multer");
const ProductsController = require("../controller/ProductsController");
const { uploadImages } = require("../middleware/csv_multer");

router.get("/products/list", ProductsController.getProducts);
router.get("/productsTable/list", ProductsController.getProductsTable);

router.post("/product/getById", ProductsController.getEditProduct);
router.get("/product/getProduct/:slug", ProductsController.getProductBySlug);
router.get(
  "/product/printing-products/:slug",
  ProductsController.getProductBySlug
);
router.post(
  "/products/add",
  upload.fields([{ name: "product_image" }, { name: "brand_image" }]),
  ProductsController.addProduct
);
router.put(
  "/products/update/:id",
  upload.fields([{ name: "product_image" }, { name: "brand_image" }]),
  ProductsController.updateProduct
);
router.delete("/products/delete", ProductsController.deleteProduct);

router.post("/products/importfile",uploadImages ,ProductsController.importCsvFile);

module.exports = router;
