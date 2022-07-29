const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const artWork = require("../models/artWork");

class ArtworkController {
  constructor() {}

  // Fetching all brands.
  async getartwork(req, res) {
    try {
      const result = await artWork.getArtwork();

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
      return result;
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }

  // Add new Brands.
  // async addsetting(req, res) {
  //   try {
  //     req
  //       .checkBody("phone_no")
  //       .notEmpty()
  //       .withMessage("Please enter phone number.");

  //     req.checkBody("email").notEmpty().withMessage("Please enter email.");
  //     req.checkBody("logo").notEmpty().withMessage("Please select logo.");
  //     req
  //       .checkBody("artwork_label1")
  //       .notEmpty()
  //       .withMessage("Please enter artwork label.");
  //     const errors = req.validationErrors();
  //     if (errors) {
  //       return ResponseHandler.errorResponse(
  //         res,
  //         400,
  //         MSGConst.SOMETHING_WRONG,
  //         errors
  //       );
  //     }

  //     const result = await Setting.addsetting(req.body);

  //     if (!result) {
  //       return ResponseHandler.errorResponse(
  //         res,
  //         400,
  //         MSGConst.SOMETHING_WRONG,
  //         []
  //       );
  //     }
  //     if (result) {
  //       if (result[0]?.phone_no === req.body.phone_no) {
  //         return ResponseHandler.errorResponse(res, 400, MSGConst.BRAND_EXIST);
  //       }
  //       return ResponseHandler.successResponse(
  //         res,
  //         200,
  //         MSGConst.BRAND_ADD,
  //         []
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
  //   }
  // }

  // Updating brand by its id.
  async updateArtwork(req, res) {
    try {
      const errors = req.validationErrors();

      if (errors) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          errors
        );
      }
      // let filename = (await req.files) ? req.files?.filename : req.body.file;
      // console.log(req.body, filename);
      const result = await artWork.updateArtwork(req.body, req.files);

      if (!result) {
        return ResponseHandler.errorResponse(
          res,
          400,
          MSGConst.SOMETHING_WRONG,
          []
        );
      }
      return ResponseHandler.successResponse(
        res,
        200,
        MSGConst.ARTWORK_UPDATE,
        []
      );
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
  }

  // Delete brand by its id.
  // async deleteBrand(req, res) {
  //   try {
  //     const result = await Brands.deleteBrand(req.body.id);

  //     if (!result) {
  //       return ResponseHandler.errorResponse(
  //         res,
  //         400,
  //         MSGConst.SOMETHING_WRONG,
  //         []
  //       );
  //     }
  //     if (result) {
  //       return ResponseHandler.successResponse(
  //         res,
  //         200,
  //         MSGConst.BRAND_DELETE,
  //         []
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
  //   }
  // }
}

module.exports = new ArtworkController();
