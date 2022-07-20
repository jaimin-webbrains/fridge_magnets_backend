var express = require("express");
var router = express.Router();
// const auth = require("../middleware/auth");
const ContactusController = require("../controller/ContactusController");

router.post("/contact-us/add", ContactusController.addContactUs);

module.exports = router;
