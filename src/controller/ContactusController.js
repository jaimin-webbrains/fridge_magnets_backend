const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const contactus = require("../models/contactus");

class ContactusController {
  constructor() {}

  // Fetching all brands.

  // Add new Brands.
  async addContactUs(req, res) {
    console.log(req.body, "khghjgh");
    try {
      req.checkBody("name").notEmpty().withMessage("Please enter name.");
      req.checkBody("email").notEmpty().withMessage("Please enter email.");
      req.checkBody("mobile").notEmpty().withMessage("Please enter mobile.");

      const errors = req.validationErrors();
      if (errors) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          errors
        );
      }

      const result = await contactus.addContactUs(req.body);

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
          MSGConst.EMAIL_SEND,
          []
        );
      }
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }
}

module.exports = new ContactusController();
