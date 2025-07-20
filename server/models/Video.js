const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  videoUrl: String,
  channel: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    avatar: String,
  },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", videoSchema);
