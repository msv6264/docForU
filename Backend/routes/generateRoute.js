import express from "express";
import multer from "multer";
import path from "path";
import { generateDoc } from "../controllers/generateController.js";

const router = express.Router();

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },

  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const ext = path.extname(file.originalname).toLowerCase();

    const allowedExtensions = [
      ".jpg", ".jpeg", ".png", ".pdf", ".pptx", ".docx"
    ];

    if (
      allowedMimeTypes.includes(file.mimetype) &&
      allowedExtensions.includes(ext)
    ) {
      cb(null, true);   // ✅ accept file
    } else {
      cb(new Error("Invalid file type"), false); // ❌ reject file
    }
  },
});

router.post("/", upload.single("file"), generateDoc); // go to generate doc file if file is verified

export default router;