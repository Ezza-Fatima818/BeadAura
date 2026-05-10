const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "custom-designs",
    allowed_formats: ["png", "jpg", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

module.exports = upload;