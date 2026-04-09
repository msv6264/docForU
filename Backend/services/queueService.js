import { generateDoc } from "../controllers/generateController.js";

let queue = [];
let activeJobs = 0;
const MAX = 1;

export const addToQueue = (job) => {
  queue.push(job);
  processQueue();
};

const processQueue = () => {
  if (queue.length === 0 || activeJobs >= MAX) return;

  const { req, res } = queue.shift();
  activeJobs++;

  generateDoc(req, res)
    .catch((err) => {
      console.error("ERROR: ", err.message);
      res.status(500).json({ error: "Failed to generate document" });
    })
    .finally(() => {
      activeJobs--;
      processQueue();
    });
};
