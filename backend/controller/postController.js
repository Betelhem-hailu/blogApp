const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const Notification = require('../models/notification');
const Tag = require('../models/tag');
const Comment = require('../models/comment');
const { uploadImage, deleteImage } = require("../service/imageUploadService");

const userSocketMap = new Map();

// Create a new post
const createPost = async (req, res) => {
    const { title, content, status } = req.body;
    const tagNames = JSON.parse(req.body.tags);
    const userId = req.user.userId;
    const coverImage = req.files.coverImage[0].path;
    const galleryImages = req.files.galleryImages?.map(file => file.path);
    const io = req.io;
    
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
        const allUsers = await User.find(); // Modify this if you have a subscription-based model
        const notifications = allUsers.map((user) => ({
            user: user._id,
            message: `A new post titled "${newPost.title}" has been published.`,
            type: "newPost",
            relatedPost: newPost._id,
        }));
        await Notification.insertMany(notifications);

        // Notify readers in real-time
        allUsers.forEach((user) => {
            const socketId = userSocketMap.get(user._id.toString());
            if (socketId) {
                io.to(socketId).emit("notification", {
                    message: `A new post titled "${newPost.title}" has been published.`,
                    postId: newPost._id,
                });
            }
        });

        res.status(201).json({message: "Post created successfully"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all posts
const getPost = async (req, res) => {
    try {
        const posts = await Post.find({ status: "post"}).populate('tags', 'name').populate('user', 'name profilePicture');
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
        const post = await Post.findById(req.params.id).populate({ path: 'comments', select: '_id message createdAt',
            populate: {
              path: 'user',
              select: 'name'
            }}) .populate('tags', 'name').populate('user', 'name profilePicture');
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
    const io = req.io;

    try {
        const newComment = new Comment({ message, post: postId, user: req.user.userId });
        await newComment.save();

        // Optionally, add the comment ID to the post's comments array
        await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

        // Populate the comment with user details
        const populatedComment = await newComment.populate({
            path: 'user',
            select: 'name'
        });
        const post = await Post.findById(postId).populate("user", "name");

        // Emit the new comment to the post's room
        io.to(postId).emit("newComment", populatedComment);

         // Send notification to the post author (if not the commenter)
         if (post.user._id.toString() !== req.user.userId) {
            const notification = new Notification({
                user: post.user._id,
                message: `${populatedComment.user.name} commented on your post "${post.title}".`,
                type: "comment",
                relatedPost: postId,
            });
            await notification.save();

            // Notify the author in real time
            const socketId = userSocketMap.get(post.user._id.toString());
            if (socketId) {
                req.io.to(socketId).emit("notification", notification);
            }
        }
            
        // Send the new comment as the response
        res.status(201).json(populatedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.userId, isRead: false })
            .sort({ createdAt: -1 })
            .limit(20); 
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const markNotificationsAsRead = async (req, res) => {
    try {
        const { notificationIds } = req.body; 
        await Notification.updateMany({ _id: { $in: notificationIds } }, { isRead: true });

        res.status(200).json({ message: "Notifications marked as read." });
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
    getNotifications,
    markNotificationsAsRead
};
