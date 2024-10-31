const express = require("express");
const router = express.Router();
const  uploadImages  = require("../config/multer");
const { createPost, getPost, getPostId, deletePost, createComment } = require("../controller/postController");

router.post("/createPost", uploadImages.fields([{ name: 'coverImage' }, { name: 'galleryImages' }]), createPost);
router.get("/getPost", getPost);
router.get("/getPost/:id", getPostId);
router.delete("/deletePost/:id", deletePost);
router.post("/:postId/comments", createComment);

module.exports = router;
