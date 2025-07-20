const Video = require("../models/Video");

exports.createVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ error: "Video and Thumbnail are required." });
    }

    const videoFile = req.files.video[0];
    const thumbnailFile = req.files.thumbnail[0];

    const video = await Video.create({
      title,
      description,
      videoUrl: `/uploads/${videoFile.filename}`,
      thumbnail: `/uploads/${thumbnailFile.filename}`,
      channel: {
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar || "https://i.pravatar.cc/150",
      },
    });

    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};


exports.getAllVideos = async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });
  res.json(videos);
};

exports.getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ msg: "Video not found" });

  res.json(video);
};
