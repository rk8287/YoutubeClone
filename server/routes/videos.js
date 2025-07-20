const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createVideo,
  getAllVideos,
  getVideoById,
} = require("../controllers/videoController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create Video route with local upload (video + thumbnail)
router.post(
  "/",
  auth,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createVideo
);


router.get("/", getAllVideos);

router.get("/:id", getVideoById);

module.exports = router;
