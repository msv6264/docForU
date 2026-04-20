import env from "./config/env.js";
import express from "express";
import cors from "cors";
import multer from "multer";
import { addToQueue } from "./services/queueService.js";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors({ origin: env.FRONTEND_URL }));
const PORT = env.PORT;

app.post("/generate", upload.single("file"), (req, res) => {
  addToQueue({ req, res });
});

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