const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const Markers = require("../models/markers");

class MarkersController {
    constructor() {}

    // Fetching all markers.
    async getMarkers(req, res) {
        try {
            const result = await Markers.getMarkers();

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

    // Add new Markers.
    async addMarker(req, res) {
        try {
            req.checkBody("marker")
                .notEmpty()
                .withMessage("Please enter marker name.")
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

            const result = await Markers.addMarker(req.body);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                if (result[0]?.marker === req.body.marker) {
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.MARKER_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.MARKER_ADD,
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

    // Updating marker by its id.
    async updateMarker(req, res) {
        try {
            req.checkBody("marker")
                .notEmpty()
                .withMessage("Please enter marker name.")
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

            const result = await Markers.updateMarker(req.body);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                if (result[0]?.marker === req.body.marker) {
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.MARKER_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.MARKER_UPDATE,
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

    // Delete marker by its id.
    async deleteMarker(req, res) {
        try {
            const result = await Markers.deleteMarker(req.body.id);

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
                    MSGConst.MARKER_DELETE,
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

module.exports = new MarkersController();
