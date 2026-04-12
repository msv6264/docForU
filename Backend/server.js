import env from "./config/env.js";
import express from "express";
import cors from "cors";
import multer from "multer";
import { addToQueue } from "./services/queueService.js";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = env.PORT;

/**
 * Route to handle document generation requests
 * @route POST /generate
 */
app.post("/generate", (req, res) => {
  const { docData } = req.body;
  if (!docData) {
    return res.status(400).json({ error: "docData is required" });
  }
  // console.log('Adding job to queue, docType:', docData.docType);
  addToQueue({ docData, res });
});

/**
 * Route to handle file uploads
 * @route POST /api/upload
 * @param {string} file - The file to be uploaded (multipart/form-data)
 */
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: `File ${req.file.originalname} received successfully`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});