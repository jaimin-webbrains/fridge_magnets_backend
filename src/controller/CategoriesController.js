const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const Categories = require("../models/categories");
class CategoriesController {
  constructor() {}
  // Fetching all categories.
  async getCategories(req, res) {
    try {
      const result = await Categories.getCategories();
      let parentIdArr = [];
      let categoryArr = [];
      result.map((x) => x.parent_id === 0 && parentIdArr.push(x));
      parentIdArr.map((p) => {
        categoryArr.push({ ...p, parent_category_name: "" });
        result.map((x) => {
          if (x.parent_id === p.id) {
            categoryArr.push({
              ...x,
              parent_category_name: p.name,
            });
          }
        });
      });

      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      if (result) {
        return ResponseHandler.successResponse(res, 200, "", categoryArr);
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }
  async getParentCategories(req, res) {
    try {
      const result = await Categories.getParentCategories();
      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      if (result) {
        return ResponseHandler.successResponse(res, 200, "", result);
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }

  //get category from parent id

  async getCategoryByParentId(req, res) {
    try {
      const result = await Categories.getCategoryByParentId(req.body.parent_id);
      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      if (result) {
        return ResponseHandler.successResponse(res, 200, "", result);
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }

  // Add new Categories.
  async addCategory(req,res) {

    try {
      
      req
        .checkBody("name")
        .notEmpty()
        .withMessage("Please enter category name.")
        .isLength({ max: 100 })
        .withMessage("name length less then 100 char");
      req
        .checkBody("description")
        .notEmpty()
        .withMessage("Please enter category description.");
      req
        .checkBody("parent_id")
        .notEmpty()
        .withMessage("Please enter parent category.")
        .isInt()
        .withMessage("Please enter valid parent category.");
        
      const errors = req.validationErrors();
      if (errors) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          errors
        );
      }
      const result = await Categories.addCategory(req.body);
      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      if (result) {
        if (result[0]?.name === req.body.name) {
          return ResponseHandler.errorResponse(
            res,
            400,
            MSGConst.CATEGORY_EXIST
          );
        }
        return ResponseHandler.successResponse(
          res,
          200,
          MSGConst.CATEGORY_ADD,
          []
        );
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }
  // Updating category by its id.
  async updateCategory(req, res) {
    try {
      req
        .checkBody("name")
        .notEmpty()
        .withMessage("Please enter category name.")
        .isLength({ max: 50 })
        .withMessage("name length less then 50 char");

      req
        .checkBody("description")
        .notEmpty()
        .withMessage("Please enter category description.");

      req
        .checkBody("parent_id")
        .notEmpty()
        .withMessage("Please enter parent category.")
        .isInt()
        .withMessage("Please enter valid parent category.");
      const errors = req.validationErrors();
      if (errors) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          errors
        );
      }
      const result = await Categories.updateCategory(req.body);
      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      if (result) {
        if (result[0]?.name === req.body.name) {
          return ResponseHandler.errorResponse(
            res,
            400,
            MSGConst.CATEGORY_EXIST
          );
        }
        return ResponseHandler.successResponse(
          res,
          200,
          MSGConst.CATEGORY_UPDATE,
          []
        );
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }
  // Delete category by its id.
  async deleteCategory(req, res) {
    try {
      const result = await Categories.deleteCategory(req.body.id);
      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      if (result) {
        return ResponseHandler.successResponse(
          res,
          200,
          MSGConst.CATEGORY_DELETE,
          []
        );
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }
}
module.exports = new CategoriesController();
