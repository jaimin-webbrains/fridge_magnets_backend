var express = require("express");
var router = express.Router();
const InquiryController = require("../controller/InquiryController");

router.get("/inquiries/list", InquiryController.getInquiries);
router.post("/inquiry/add", InquiryController.addInquiry);

module.exports = router;
