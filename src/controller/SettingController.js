const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const Setting = require("../models/setting");

class SettingController {
    constructor() {}

    // Fetching all brands.
    async getSetting(req, res) {
        try {
            const result = await Setting.getSetting();

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
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    // Updating brand by its id.
    async updatesetting(req, res) {
        try {
            req.checkBody("phone_no")
                .notEmpty()
                .withMessage("Please enter phone number.");

            req.checkBody("email")
                .notEmpty()
                .withMessage("Please enter email.");
            if (req.body.logo) {
                req.checkBody("logo", "Please add a logo image.").notEmpty();
            }
            // req.checkBody("logo").notEmpty().withMessage("Please select logo.");
            req.checkBody("artwork_label1")
                .notEmpty()
                .withMessage("Please enter artwork label.");

            const errors = req.validationErrors();

            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }
            let filename = (await req.file)
                ? req.file?.filename
                : req.body.logo;

            const result = await Setting.updateSetting(req.body, filename);

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
                MSGConst.SETTING_UPDATE,
                []
            );
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

    async getAboutus(req, res) {
        try {
            const result = await Setting.getSetting();

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
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    async UpdateAboutUs(req, res) {
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
        const result = await Setting.UpdateAboutUs(req.body);

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
            MSGConst.ABOUTUS_UPDATE,
            []
        );
    }
    catch(e) {
        console.log(e);
        ResponseHandler.errorResponse(res, 400, MSGConst.SOMETHING_WRONG, []);
    }
}

module.exports = new SettingController();
