const router = require("express").Router();
const cloudinary = require("cloudinary");
const Authentication = require("../middleware/authentication");
const AuthAdmin = require("../middleware/authAdmin");
const fs = require("fs");

//we will upload image in cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//upload image
router.post("/upload", Authentication, AuthAdmin, async (req, res) => {
  try {
    var ArrayFiles;
    //checking weather files object is empty or not

    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ msg: "No files were uploaded" });
    if (!Array.isArray(req.files.file)) {
      ArrayFiles = Object.values(req.files);
    } else {
      ArrayFiles = req.files.file;
    }

    ArrayFiles.forEach((file) => {
      //checking size of file
      if (file.size > 1024 * 1024) {
        // > 1 mb
        removeTmp(file.tempFilePath);
        return res.status(400).json({ msg: "file is too large" });
      }
      //checking format of file
      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ msg: "file format is not suppoerted" });
      }
    });

    //uploading file after all checks
    var arrayOfUrls = [];
    var itemProcessed = 0;
    ArrayFiles.forEach((file) => {
      cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        arrayOfUrls.push({ public_id: result.public_id, url: result.secure_url });

        itemProcessed = itemProcessed + 1;

        if (itemProcessed === ArrayFiles.length) {
          res.json({ arrayOfUrls, msg: "Uploaded successsfully" });
        }
      });
    });
  } catch (e) {
    return res.status(500).send({ msg: e.message });
  }
});

//deleting image
router.post("/destroy", Authentication, AuthAdmin, async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No images selected" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "Image deleted" });
    });
  } catch (e) {
    return res.status(500).send({ msg: e.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
