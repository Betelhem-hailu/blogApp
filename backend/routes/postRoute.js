const express = require("express");
const router = express.Router();
const uploadImages = require("../config/multer");
const authenticate = require("../middleware/authMiddleware");
const {
  createPost,
  getPost,
  getPostbyId,
  deletePost,
  createComment,
  getTags,
  updatePost,
  getPostByUser,
  getNotifications,
  markNotificationsAsRead,
  toggleLike,
  getPopularPosts,
} = require("../controller/postController");
const validatePostCreation = require("../middleware/validatePostCreate");
const optionalAuthenticate = require("../middleware/optionalAuthMiddleware");

router.post(
  "/createPost",
  authenticate,
  uploadImages,
  validatePostCreation,
  createPost
);
router.get("/getTag", getTags);
router.get("/getPost", getPost);
router.get("/getPopularPost", getPopularPosts);
router.get("/getPost/:id", optionalAuthenticate, getPostbyId);
router.post("/:postId/like", authenticate, toggleLike);
router.get("/getPostsbyuserId", authenticate, getPostByUser);
router.put("/updatePost/:id", authenticate, uploadImages, updatePost);
router.delete("/deletePost/:id", authenticate, deletePost);
router.post("/:postId/comments", authenticate, createComment);
router.get("/notifications", authenticate, getNotifications);
router.put("/markAsRead", authenticate, markNotificationsAsRead);

module.exports = router;
