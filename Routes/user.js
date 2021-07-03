const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/registerUser", userController.SignUp);
router.post("/loginUser", userController.Login);

module.exports = router;
