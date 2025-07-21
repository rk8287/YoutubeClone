const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addComment, getComments, deleteComment } = require("../controllers/commentController");

router.post("/", auth, addComment);
router.get("/:videoId", getComments);
router.delete("/:id", auth, deleteComment);

module.exports = router;
