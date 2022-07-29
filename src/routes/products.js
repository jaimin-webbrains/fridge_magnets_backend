var express = require("express");
var router = express.Router();
const { upload } = require("../middleware/multer");
const ProductsController = require("../controller/ProductsController");
const { uploadImages } = require("../middleware/csv_multer");
const auth = require("../middleware/auth");

router.get("/products/list", ProductsController.getProducts);
router.get("/productsTable/list", ProductsController.getProductsTable);

router.post("/product/getById", ProductsController.getEditProduct);
router.get("/product/getProduct/:slug", ProductsController.getProductBySlug);
router.get(
  "/product/categories/:slug/:brand",
  ProductsController.getBrandProducts
);
router.get(
  "/product/printing-products/:slug/:brand",
  ProductsController.getBrandProducts
);
router.get(
  "/product/printing-products/:slug",
  ProductsController.getProductBySlug
);
router.post(
  "/products/add", auth ,
  upload.fields([{ name: "product_image" }, { name: "brand_image" }]),
  ProductsController.addProduct
);
router.put(
  "/products/update/:id", auth ,
  upload.fields([{ name: "product_image" }, { name: "brand_image" }]),
  ProductsController.updateProduct
);
router.delete("/products/delete", auth, ProductsController.deleteProduct);

router.post("/products/importfile", auth ,uploadImages ,ProductsController.importCsvFile);

module.exports = router;
