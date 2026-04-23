const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { uploadResume } = require("../controllers/uploadController");

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// route
router.post("/upload-resume", upload.single("resume"), uploadResume);

module.exports = router;