var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const FAQsController = require("../controller/FAQsController");

router.get("/faqs/list", FAQsController.getFAQs);
router.get("/faqs/types",FAQsController.getFAQsType)
router.post("/faqs/add", auth , FAQsController.addFAQ);
router.put("/faqs/update", auth , FAQsController.updateFAQ);
router.delete("/faqs/delete", auth , FAQsController.deleteFAQ);

module.exports = router;