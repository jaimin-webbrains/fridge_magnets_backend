const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const Colors = require("../models/colors");

class ColorsController {
    constructor() {}

    // Fetching all colors.
    async getColors(req, res) {
        try {
            const result = await Colors.getColors()

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

    // Add new Colors.
    async addColor(req, res) {
        try {
            req.checkBody("color")
                .notEmpty()
                .withMessage("Please enter color name.")
                .isLength({ max: 50 })
                .withMessage("name length less then 50 char")
            
           
            const errors = req.validationErrors();
            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            const result = await Colors.addColor(req.body);
            console.log("result",result)

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                
                if (result[0]?.color === req.body.color) {
                   
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.COLORS_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.COLORS_ADD,
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

    // Updating color by its id.
    async updateColor(req, res) {
        try {
            req.checkBody("color")
                .notEmpty()
                .withMessage("Please enter color name.")
                .isLength({ max: 50 })
                .withMessage("name length less then 50 char")
          
         
            const errors = req.validationErrors();

            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            const result = await Colors.updateColor(req.body);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                if (result[0]?.color === req.body.color) {
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.COLORS_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.COLORS_UPDATE,
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

    // Delete color by its id.
    async deleteColor(req, res) {
        try {
            const result = await Colors.deleteColor(req.body.id);

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
                    MSGConst.COLOR_DELETE,
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

module.exports = new ColorsController();
