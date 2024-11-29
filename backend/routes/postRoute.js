const express = require("express");
const router = express.Router();
const  uploadImages  = require("../config/multer");
const authenticate = require("../middleware/authMiddleware");
const { createPost, getPost, getPostbyId, deletePost, createComment, getTags, updatePost, getPostByUser, getNotifications, markNotificationsAsRead } = require("../controller/postController");
const validatePostCreation = require("../middleware/validatePostCreate");

router.post("/createPost", authenticate, uploadImages, validatePostCreation, createPost);
router.get("/getTag", getTags);
router.get("/getPost", getPost);
router.get("/getPost/:id", getPostbyId);
router.get("/getPostsbyuserId", authenticate, getPostByUser);
router.put("/updatePost/:id", authenticate, uploadImages, updatePost);
router.delete("/deletePost/:id", authenticate, deletePost);
router.post("/:postId/comments", authenticate, createComment);
router.get("/notifications", authenticate, getNotifications);
router.put("/markAsRead", authenticate, markNotificationsAsRead);

module.exports = router;
