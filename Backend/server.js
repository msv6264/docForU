
import express from "express";
import cors from "cors";
import multer from "multer";
import { generateDoc } from "./controllers/generateController.js";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
``
app.post("/generate", upload.single("file"), (req, res) => {
  generateDoc(req, res);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});