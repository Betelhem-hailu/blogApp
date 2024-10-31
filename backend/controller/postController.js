const express = require('express');
const Post = require('../models/post');
const Tag = require('../models/tag');
const Comment = require('../models/comment');
const { uploadImage } = require("../service/imageUploadService");

// Create a new post
const createPost = async (req, res) => {
    const { title, content, status } = req.body;
    const tagNames = req.body.tags;
    // const userId = req.user.id;
    const coverImage = req.files.coverImage[0].path;
    const galleryImages = req.files.galleryImages.map(file => file.path);
    
    try {
        let coverImageUrl = null;
        let galleryImageUrls = [];
        
        if (coverImage) {
            coverImageUrl = await uploadImage(coverImage, "cover_image");
        }
        
        if (galleryImages && galleryImages.length > 0) {
            galleryImageUrls = await Promise.all(
                galleryImages.map(async (image) => {
                    return await uploadImage(image, "gallery_images");
                })
            );
        }

        const existingTags = await Tag.find({ name: { $in: tagNames } });
        const existingTagNames = existingTags.map(tag => tag.name);
        const newTagNames = tagNames.filter(name => !existingTagNames.includes(name));

        const newTags = await Promise.all(
            newTagNames.map(async (tagName) => {
                const newTag = new Tag({ name: tagName });
                await newTag.save();
                return newTag;
            })
        );

        const tagIds = [
            ...existingTags.map(tag => tag._id),
            ...newTags.map(tag => tag._id),
        ];

        const newPost = new Post({
            title,
            content,
            status,
            coverImage: coverImageUrl,
            galleryImages: galleryImageUrls,
            tags: tagIds,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all posts
const getPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific post
const getPostId = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments');
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a post
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedPost);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// Delete a post
const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createComment = async (req, res) => {
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
};

module.exports = {
    createPost,
    getPost,
    getPostId,
    deletePost,
    createComment,
};
