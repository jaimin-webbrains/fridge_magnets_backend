const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const Products = require("../models/products");

class ProductsController {
  constructor() {}

  // Fetching all products.
  async getProducts(req, res) {
    try {
      const result = await Products.getProducts();

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

  //Edit Product
  async getEditProduct(req, res) {
    try {
      const result = await Products.getEditProduct(req.body);

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

  // Add new Products.
  async addProduct(req, res) {
    try {
      req
        .checkBody("product_name")
        .notEmpty()
        .withMessage("Please enter product name.");

      req
        .checkBody("category_id")
        .notEmpty()
        .withMessage("Please enter category id.")
        .isInt()
        .withMessage("Please enter valid category id.");

      req
        .checkBody("parent_category_id")
        .notEmpty()
        .withMessage("Please enter parent category id.")
        .isInt()
        .withMessage("Please enter valid parent category id.");

      // req
      //   .checkBody("color_id")
      //   .notEmpty()
      //   .withMessage("Please enter color id.")
      //   .isInt()
      //   .withMessage("Please enter valid color id.");

      // req
      //   .checkBody("size_id")
      //   .notEmpty()
      //   .withMessage("Please enter size id.")
      //   .isInt()
      //   .withMessage("Please enter valid size id.");

      // req
      //   .checkBody("paper_type_id")
      //   .notEmpty()
      //   .withMessage("Please enter paper type id.")
      //   .isInt()
      //   .withMessage("Please enter valid paper type id.");

      // req
      //   .checkBody("marker_id")
      //   .notEmpty()
      //   .withMessage("Please enter marker id.")
      //   .isInt()
      //   .withMessage("Please enter valid marker id.");

      const errors = req.validationErrors();
      if (errors) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          errors
        );
      }

      const result = await Products.addProduct(req.body, req.files);

      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      if (result) {
        if (result[0]?.product_name === req.body.product_name) {
          return ResponseHandler.errorResponse(
            res,
            400,
            MSGConst.PRODUCT_EXIST
          );
        }
        return ResponseHandler.successResponse(
          res,
          200,
          MSGConst.PRODUCT_ADD,
          []
        );
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }

  // Updating product by its id.
  async updateProduct(req, res) {
    try {
      req
        .checkBody("product_name")
        .notEmpty()
        .withMessage("Please enter product name.");

      req
        .checkBody("category_id")
        .notEmpty()
        .withMessage("Please enter category id.")
        .isInt()
        .withMessage("Please enter valid category id.");

      req
        .checkBody("parent_category_id")
        .notEmpty()
        .withMessage("Please enter parent category id.")
        .isInt()
        .withMessage("Please enter valid parent category id.");

      // req
      //   .checkBody("color_id")
      //   .notEmpty()
      //   .withMessage("Please enter color id.")
      //   .isInt()
      //   .withMessage("Please enter valid color id.");

      // req
      //   .checkBody("size_id")
      //   .notEmpty()
      //   .withMessage("Please enter size id.")
      //   .isInt()
      //   .withMessage("Please enter valid size id.");

      // req
      //   .checkBody("paper_type_id")
      //   .notEmpty()
      //   .withMessage("Please enter paper type id.")
      //   .isInt()
      //   .withMessage("Please enter valid paper type id.");

      // req
      //   .checkBody("marker_id")
      //   .notEmpty()
      //   .withMessage("Please enter marker id.")
      //   .isInt()
      //   .withMessage("Please enter valid marker id.");

      const errors = req.validationErrors();

      if (errors) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          errors
        );
      }

      const result = await Products.updateProduct(
        req.body,
        req.params.id,
        req.files
      );

      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      if (result) {
        if (result[0]?.product_name === req.body.product_name) {
          return ResponseHandler.errorResponse(
            res,
            400,
            MSGConst.PRODUCT_EXIST
          );
        }
        return ResponseHandler.successResponse(
          res,
          200,
          MSGConst.PRODUCT_UPDATE,
          []
        );
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }

  // Delete product by its id.
  async deleteProduct(req, res) {
    try {
      const result = await Products.deleteProduct(req.body.id);
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
          MSGConst.PRODUCT_DELETE,
          []
        );
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }
}

module.exports = new ProductsController();
