const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recipient of the notification
    message: { type: String, required: true }, // Notification message
    type: { type: String, enum: ["comment", "newPost"], required: true }, // Type of notification
    isRead: { type: Boolean, default: false }, // Read status
    relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Related post (if any)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
