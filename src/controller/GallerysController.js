const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const Gallerys = require("../models/gallerys");

class GallerysController {
    constructor() {}

    // Fetching all gallerys.
    async getGallerys(req, res) {
        try {
            const result = await Gallerys.getGallerys()

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

    // Add new Gallerys.
    async addGallery(req, res) {
        try {
            req.checkBody("category_id")
                .notEmpty()
                .withMessage("Please enter gallery name.")
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
            const result = await Gallerys.addGallery(req.body,req.files);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                
                // if (result[0]?.category_id === req.body.category_id) {
                   
                //     return ResponseHandler.errorResponse(
                //         res,
                //         400,
                //         MSGConst.COLORS_EXIST
                //     );
                // }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.GALLERYS_ADD,
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

    // Updating gallery by its id.
    // async updateGallery(req, res) {
    //     try {
    //         req.checkBody("category_id")
    //             .notEmpty()
    //             .withMessage("Please enter gallery name.")
    //             .isLength({ max: 50 })
    //             .withMessage("name length less then 50 char")
          
         
    //         const errors = req.validationErrors();

    //         if (errors) {
    //             return ResponseHandler.errorResponse(
    //                 res,
    //                 400,
    //                 MSGConst.SOMETHING_WRONG,
    //                 errors
    //             );
    //         }
    //         console.log("req.body",req.body,req.files)

    //         const result = await Gallerys.updateGallery(req.body,req.files);

    //         if (!result) {
    //             return ResponseHandler.errorResponse(
    //                 res,
    //                 400,
    //                 MSGConst.SOMETHING_WRONG,
    //                 []
    //             );
    //         }
    //         if (result) {
    //             if (result[0]?.category_id === req.body.category_id) {
    //                 return ResponseHandler.errorResponse(
    //                     res,
    //                     400,
    //                     MSGConst.COLORS_EXIST
    //                 );
    //             }
    //             return ResponseHandler.successResponse(
    //                 res,
    //                 200,
    //                 MSGConst.COLORS_UPDATE,
    //                 []
    //             );
    //         }
    //     } catch (e) {
    //         console.log(e);
    //         ResponseHandler.errorResponse(
    //             res,
    //             400,
    //             MSGConst.SOMETHING_WRONG,
    //             []
    //         );
    //     }
    // }

    // Delete gallery by its id.
    async deleteGallery(req, res) {
        try {
            const result = await Gallerys.deleteGallery(req.body.id);

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
                    MSGConst.GALLERYS_DELETED,
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

module.exports = new GallerysController();
