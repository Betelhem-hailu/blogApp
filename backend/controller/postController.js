const express = require('express');
const Post = require('../models/post');
const Tag = require('../models/tag');
const Comment = require('../models/comment');
const { uploadImage, deleteImage } = require("../service/imageUploadService");

// Create a new post
const createPost = async (req, res) => {
    const { title, content, status } = req.body;
    const tagNames = JSON.parse(req.body.tags);
    const userId = req.user.userId;
    const coverImage = req.files.coverImage[0].path;
    const galleryImages = req.files.galleryImages?.map(file => file.path);
    
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
        const newTagNames = tagNames?.filter(name => !existingTagNames.includes(name));

        const newTags = await Promise.all(
            newTagNames?.map(async (tagName) => {
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
            user: userId,
            title,
            content,
            status,
            coverImage: coverImageUrl,
            galleryImages: galleryImageUrls,
            tags: tagIds,
        });

        await newPost.save();
        res.status(201).json({message: "Post created successfully"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all posts
const getPost = async (req, res) => {
    try {
        const posts = await Post.find();
        if (!posts) {
            return res.status(404).json({ code: "NO_POST", message: "No posts found" });
        }
        else {
        res.json(posts);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Get Post by loggedin user
const getPostByUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const posts = await Post.find({ user: userId });
        if (!posts) {
            return res.status(404).json({ code: "NO_POST", message: "No posts found" });
        }
        else {
            res.json(posts);
            }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
    };

//Get tags
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }


// Get a specific post
const getPostbyId = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments') .populate('tags', 'name');
        if (!post) {
            return res.status(404).json({ code: "NO_POST", message: "No posts found" });
        }
        else {
        res.json(post); }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a post
const updatePost = async (req, res) => {
    const { id } = req.params; 
    const { title, content, status } = req.body;
    const tagNames = req.body.tags ? JSON.parse(req.body.tags) : [];
    const coverImage = req.files?.coverImage?.[0]?.path;
    const galleryImages = req.files?.galleryImages?.map(file => file.path);

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({code: "POST_NOT_FOUND", message: "Post not found" });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.status = status || post.status;

        if (coverImage) {
            if (post.coverImage) {
                await deleteImage(post.coverImage); 
            }
            post.coverImage = await uploadImage(coverImage, "cover_image");
        }

        if (galleryImages) {
            if (post.galleryImages && post.galleryImages.length > 0) {
                await Promise.all(post.galleryImages.map(image => deleteImage(image)));
            }
        
            post.galleryImages = await Promise.all(
                galleryImages.map(image => uploadImage(image, "gallery_images"))
            );
        }

     
        const existingTags = await Tag.find({ name: { $in: tagNames } });
        const existingTagNames = existingTags.map(tag => tag.name);
        const newTagNames = tagNames.filter(name => !existingTagNames.includes(name));

        const newTags = await Promise.all(
            newTagNames.map(async tagName => {
                const newTag = new Tag({ name: tagName });
                await newTag.save();
                return newTag;
            })
        );

        const tagIds = [
            ...existingTags.map(tag => tag._id),
            ...newTags.map(tag => tag._id),
        ];
        post.tags = tagIds;

       
        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete a post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({code: "POST_NOT_FOUND", message: 'Post not found' });
          }
        res.status(200).json(req.params.id);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createComment = async (req, res) => {
    const { message } = req.body;
    const postId = req.params.postId;

    try {
        const newComment = new Comment({ message, post: postId, user: req.user.userId });
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
    getPostByUser,
    getTags,
    getPostbyId,
    updatePost,
    deletePost,
    createComment,
};
