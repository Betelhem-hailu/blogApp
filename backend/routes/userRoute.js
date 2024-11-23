const express = require("express");
const router = express.Router();
// const  uploadImages  = require("../config/multer");
const { register, login } = require("../controller/userController");
const validateRegistration = require("../middleware/ValidateRegistration");

// router.post("/register", uploadImages.single('profileImage'), register);
router.post("/register", validateRegistration, register);
router.post("/login", login);

module.exports = router;
