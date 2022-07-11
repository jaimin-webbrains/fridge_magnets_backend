var express = require("express");
var router = express.Router();
const InquiryController = require("../controller/InquiryController");

router.post("/inquiry/add", InquiryController.addInquiry);

module.exports = router;
