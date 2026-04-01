import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import multer from "multer";
import { generateDoc } from "./controllers/generateController.js";

const app = express();
const upload = multer({ dest: "uploads/" });

// TO DO: this queue implementation is only for now, needs to use different techniques later
let queue = [];
let activeJobs = 0;
const MAX = 2;

const processQueue = () => {
  if (queue.length == 0 || activeJobs > MAX){
    return;
  }

  const { req, res } = queue.shift();
  activeJobs++;

  generateDoc(req, res)
    .catch(err => {
      console.error("ERROR: ", err.message);
      res.status(500).json({ error : "Failed to generate document" });
    })
    .finally(() => {
      activeJobs--;
      processQueue();
    });
};

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.post("/generate", upload.single("file"), (req, res) => {
  queue.push({ req, res });
  processQueue();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});