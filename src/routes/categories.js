var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const CategoriesController = require("../controller/CategoriesController");

router.get("/categories/list", CategoriesController.getCategories);
router.get("/categories/parent-list", CategoriesController.getParentCategories);
router.post(
  "/categories/cat-parentId",
  CategoriesController.getCategoryByParentId
);
router.post("/categories/add", auth , CategoriesController.addCategory);
router.put("/categories/update", auth , CategoriesController.updateCategory);
router.delete("/categories/delete", auth , CategoriesController.deleteCategory);

module.exports = router;
