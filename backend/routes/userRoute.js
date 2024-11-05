const express = require("express");
const router = express.Router();
const  uploadImages  = require("../config/multer");
const { register, login } = require("../controller/userController");

router.post("/register", uploadImages.single('profileImage'), register);
router.post("/login", login);

module.exports = router;
