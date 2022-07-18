var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const PapersController = require("../controller/PapersController");

router.get("/papers/list",PapersController.getPapers);
router.post("/papers/add", auth ,PapersController.addPaper);
router.put("/papers/update", auth ,PapersController.updatePaper);
router.delete("/papers/delete", auth , PapersController.deletePaper);

module.exports = router;