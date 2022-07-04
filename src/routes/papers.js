var express = require("express");
var router = express.Router();
// const auth = require("../middleware/auth");
const PapersController = require("../controller/PapersController");

router.get("/papers/list", PapersController.getPapers);
router.post("/papers/add", PapersController.addPaper);
router.put("/papers/update", PapersController.updatePaper);
router.delete("/papers/delete", PapersController.deletePaper);

module.exports = router;