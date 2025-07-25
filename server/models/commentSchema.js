const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  videoId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
