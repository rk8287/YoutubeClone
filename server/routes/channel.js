const express = require("express");
const { createChannel, getSingleChannel, getMyChannel } = require("../controllers/channelController");
const  auth  = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", auth, createChannel);

router.get("/:id", getSingleChannel);

router.get("/me", auth, getMyChannel);

module.exports = router;
