const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },

  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = [
      "image/jpeg", "image/pjpeg", "image/png", "application/pdf", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",];

    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = [ ".jpg", ".jpeg", ".png", ".pdf", ".pptx", ".docx"];

    if (
      allowedMimeTypes.includes(file.mimetype) &&
      allowedExtensions.includes(ext)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only images and documents are allowed"), false);
    }
  },
});

app.post("/receive-data", upload.single("file"), (req, res) => {
  const docData = JSON.parse(req.body.docData || "{}");
  console.log("Parsed data:", docData);

  res.json({ message: "Received successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
