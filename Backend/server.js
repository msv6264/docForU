
import express from "express";
import cors from "cors";
import multer from "multer";
import { generateDoc } from "./controllers/generateController.js";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
``
app.post("/generate", upload.single("file"), (req, res) => {
  generateDoc(req, res);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});