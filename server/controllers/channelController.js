const Channel = require("../models/Channel");

exports.createChannel = async (req, res) => {
  const { name, avatar, banner, description } = req.body;
  const userId = req.user.id;

  try {
    const existing = await Channel.findOne({ user: userId });
    if (existing) {
      return res.status(400).json({ message: "Channel already exists" });
    }

    const newChannel = await Channel.create({
      user: userId,
      name,
      avatar,
      banner,
      description,
      user: req.user.id,
    });

    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ message: "Failed to create channel", error });
  }
};


exports.getSingleChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getMyChannel = async (req, res) => {
  const channel = await Channel.findOne({ user: req.user._id });
  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }
  res.status(200).json(channel);
};
