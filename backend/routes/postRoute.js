const express = require("express");
const router = express.Router();
const  uploadImages  = require("../config/multer");
const authenticate = require("../middleware/authMiddleware");
const { createPost, getPost, getPostId, deletePost, createComment } = require("../controller/postController");

router.post("/createPost", authenticate, uploadImages.fields([{ name: 'coverImage' }, { name: 'galleryImages' }]), createPost);
router.get("/getPost", getPost);
router.get("/getPost/:id", getPostId);
router.delete("/deletePost/:id", authenticate, deletePost);
router.post("/:postId/comments", authenticate, createComment);

module.exports = router;
