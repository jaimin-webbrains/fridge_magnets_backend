var express = require("express");
var router = express.Router();
// const auth = require("../middleware/auth");
const MarkersController = require("../controller/MarkersController");

router.get("/markers/list", MarkersController.getMarkers);
router.post("/markers/add", MarkersController.addMarker);
router.put("/markers/update", MarkersController.updateMarker);
router.delete("/markers/delete", MarkersController.deleteMarker);

module.exports = router;