const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const Brands = require("../models/brands");

class BrandsController {
    constructor() {}

    // Fetching all brands.
    async getBrands(req, res) {
        try {
            const result = await Brands.getBrands();

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
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    // Add new Brands.
    async addBrand(req, res) {
        try {
            req.checkBody("name")
                .notEmpty()
                .withMessage("Please enter brand name.")
                .isLength({ max: 50 })
                .withMessage("name length less then 50 char")
               
            req.checkBody("description")
                .notEmpty()
                .withMessage("Please enter brand description.")

            const errors = req.validationErrors();
            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            const result = await Brands.addBrand(req.body);

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
                        MSGConst.BRAND_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.BRAND_ADD,
                    []
                );
            }
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    // Updating brand by its id.
    async updateBrand(req, res) {
        try {
            req.checkBody("name")
                .notEmpty()
                .withMessage("Please enter brand name.")
                .isLength({ max: 50 })
                .withMessage("name length less then 50 char")
              
            req.checkBody("description")
                .notEmpty()
                .withMessage("Please enter brand description.")
         
            const errors = req.validationErrors();

            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            const result = await Brands.updateBrand(req.body);

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
                        MSGConst.BRAND_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.BRAND_UPDATE,
                    []
                );
            }
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    // Delete brand by its id.
    async deleteBrand(req, res) {
        try {
            const result = await Brands.deleteBrand(req.body.id);

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
                    MSGConst.BRAND_DELETE,
                    []
                );
            }
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }
}

module.exports = new BrandsController();
