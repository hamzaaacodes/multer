const express = require("express");
const mediaController = require("../controllers/mediaController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check if there is any public folder.
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public"); // If not, Create.
    }
    // Check if there is any videos folder in public folder.
    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos"); // If not, Create.
    }

    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    // Unique file name
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    // Check extension before uploading
    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed!"));
    }
    // If extensions are of video, allow to upload
    cb(null, true);
  },
});

const router = express.Router();

// Get all media
router.get("/all", mediaController.getAll);
router.post(
  "/create",
  upload.fields([{ name: "videos", maxCount: 5 }]),
  mediaController.create
);

module.exports = router;
