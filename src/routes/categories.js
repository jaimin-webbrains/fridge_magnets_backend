var express = require("express");
var router = express.Router();
// const auth = require("../middleware/auth");
const CategoriesController = require("../controller/CategoriesController");

router.get("/categories/list", CategoriesController.getCategories);
router.get("/categories/parent-list", CategoriesController.getParentCategories);
router.post("/categories/add", CategoriesController.addCategory);
router.put("/categories/update", CategoriesController.updateCategory);
router.delete("/categories/delete", CategoriesController.deleteCategory);

module.exports = router;
