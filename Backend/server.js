import env from "./config/env.js";

app.use(cors({ origin: env.FRONTEND_URL }));

import express from "express";
import cors from "cors";
import multer from "multer";
import { addToQueue } from "./services/queueService.js";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors({ origin: env.FRONTEND_URL }));
const PORT = env.PORT;
app.use(express.json());

app.post("/generate", upload.single("file"), (req, res) => {
  addToQueue({ req, res });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});