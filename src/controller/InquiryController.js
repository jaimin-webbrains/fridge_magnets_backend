const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const inquiry = require("../models/inquiry");

class InquiryController {
  constructor() {}

  async addInquiry(req, res) {
    console.log(req.body);
    try {
      req.checkBody("name").notEmpty().withMessage("Please enter name.");
      req.checkBody("quntity").notEmpty().withMessage("Please select quntity.");
      req.checkBody("email").notEmpty().withMessage("Please enter email.");
      req
        .checkBody("company")
        .notEmpty()
        .withMessage("Please enter company name.");
      req
        .checkBody("mobile")
        .notEmpty()
        .withMessage("Please enter mobile number.");
      req
        .checkBody("postcode")
        .notEmpty()
        .withMessage("Please enter postcode.");
      // req.checkBody("artwork").notEmpty().withMessage("Please select artwork.");

      const errors = req.validationErrors();
      if (errors) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          errors
        );
      }

      const result = await inquiry.addInquiry(req.body);

      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      // } else {
      //   return ResponseHandler.successResponse(
      //     res,
      //     200,
      //     MSGConst.INQUIRY_ADD,
      //     []
      //   );
      // }
      if (result) {
        return ResponseHandler.successResponse(
          res,
          200,
          MSGConst.INQUIRY_ADD,
          []
        );
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }
}

module.exports = new InquiryController();
