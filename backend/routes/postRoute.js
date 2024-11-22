const express = require("express");
const router = express.Router();
const  uploadImages  = require("../config/multer");
const authenticate = require("../middleware/authMiddleware");
const { createPost, getPost, getPostbyId, deletePost, createComment, getTags, updatePost, getPostByUser } = require("../controller/postController");

router.post("/createPost", authenticate, uploadImages, createPost);
router.get("/getTag", getTags);
router.get("/getPost", getPost);
router.get("/getPost/:id", getPostbyId);
router.get("/getPostsbyuserId", authenticate, getPostByUser);
router.put("/updatePost/:id", authenticate, uploadImages, updatePost);
router.delete("/deletePost/:id", authenticate, deletePost);
router.post("/:postId/comments", authenticate, createComment);

module.exports = router;
