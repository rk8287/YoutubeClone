const Comment = require("../models/commentSchema");

exports.addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    const comment = await Comment.create({
      videoId,
      userId: req.user.id, // Only store userId
      text,
    });

    const populatedComment = await comment.populate('userId', 'name avatar');

    res.json({
      _id: comment._id,
      text: comment.text,
      createdAt: comment.createdAt,
      userId: populatedComment.userId._id,
      userName: populatedComment.userId.name,
      userAvatar: populatedComment.userId.avatar,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate('userId', 'name avatar')  // ✅ Correct: populate userId
      .sort({ createdAt: -1 });

    const formattedComments = comments.map((c) => ({
      _id: c._id,
      text: c.text,
      createdAt: c.createdAt,
      userId: c.userId._id,
      userName: c.userId.name,
      userAvatar: c.userId.avatar,
    }));

    res.json(formattedComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "You can only delete your own comment" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ msg: "Comment deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
