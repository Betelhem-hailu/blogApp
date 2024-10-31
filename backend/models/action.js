const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
    actionType: {
        type: String,
        enum: ['like', 'view'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;
