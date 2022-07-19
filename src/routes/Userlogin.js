var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const AuthController = require("../controller/AuthController");

router.post("/auth/login", AuthController.login);
router.post("/auth/logout", auth , AuthController.user_logout);
router.post("/auth/check", auth, AuthController.check);

// router.post("/auth/forgot-password", AuthController.forgotPassword);
module.exports = router;