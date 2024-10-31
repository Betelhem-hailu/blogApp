const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const router = express.Router();


router.post('/:postId/comments', async (req, res) => {
    const { message } = req.body;
    const postId = req.params.postId;

    try {
        const newComment = new Comment({ message, post: postId });
        await newComment.save();

        // Optionally, add the comment ID to the post's comments array
        await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
