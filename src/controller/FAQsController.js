const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const FAQs = require("../models/faqs");

class FAQsController {
    constructor() {}

    // Fetching all faqs.
    async getFAQs(req, res) {
        try {
            const result = await FAQs.getFAQs()

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
    async getFAQsType(req, res) {
        try {
            const result = await FAQs.getFAQsType()

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

    // Add new FAQs.
    async addFAQ(req, res) {
        try {
            req.checkBody("faq_id")
                .notEmpty()
                .withMessage("Please enter FAQ Type")
                .isInt()
                .withMessage("Please enter valid FAQ Type.");

            req.checkBody("faq_name")
                .withMessage("Please enter FAQ Type.")

            req.checkBody("question")
                .notEmpty()
                .withMessage("Please enter Question.")

            req.checkBody("answer")
                .notEmpty()
                .withMessage("Please enter Answer.")                
            
           
            const errors = req.validationErrors();
            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            const result = await FAQs.addFAQ(req.body);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                
                if (result[0]?.question === req.body.question) {
                   
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.FAQS_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.FAQS_ADD,
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

    // Updating faq by its id.
    async updateFAQ(req, res) {
        try {
            req.checkBody("faq_id")
                .notEmpty()
                .withMessage("Please enter FAQ Type")
                .isInt()
                .withMessage("Please enter valid FAQ Type.");

            req.checkBody("faq_name")
                .withMessage("Please enter FAQ Type.")

            req.checkBody("question")
                .notEmpty()
                .withMessage("Please enter Question.")

            req.checkBody("answer")
                .notEmpty()
                .withMessage("Please enter Answer.")
         
            const errors = req.validationErrors();

            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            const result = await FAQs.updateFAQ(req.body);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                if (result[0]?.question === req.body.question) {
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.FAQS_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.FAQS_UPDATE,
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

    // Delete faq by its id.
    async deleteFAQ(req, res) {
        try {
            const result = await FAQs.deleteFAQ(req.body.id);

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
                    MSGConst.FAQ_DELETE,
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

module.exports = new FAQsController();
