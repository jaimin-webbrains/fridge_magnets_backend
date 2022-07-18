var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const MarkersController = require("../controller/MarkersController");

router.get("/markers/list", MarkersController.getMarkers);
router.post("/markers/add", auth , MarkersController.addMarker);
router.put("/markers/update", auth , MarkersController.updateMarker);
router.delete("/markers/delete", auth , MarkersController.deleteMarker);

module.exports = router;