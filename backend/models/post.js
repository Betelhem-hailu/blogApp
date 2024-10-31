const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'post'],
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    galleryImages: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', 
    }],
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
