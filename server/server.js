const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/videos");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect("mongodb+srv://rounak8287:Rounak92@cluster0.sd6la4x.mongodb.net/youtubeClone")
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
