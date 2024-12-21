const express = require("express");
const router = express.Router();
const  uploadImages  = require("../config/multer");
const { register, login, getUserById, updateProfile } = require("../controller/userController");
const validateRegistration = require("../middleware/ValidateRegistration");
const authenticate = require("../middleware/authMiddleware");

router.post("/register", validateRegistration, register);
router.post("/login", login);
router.get("/profile", authenticate, getUserById);
router.post("/updateprofile", authenticate, uploadImages, updateProfile);
router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.json({ message: "Logout successful" });
});

module.exports = router;
