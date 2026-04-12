import { generateDoc } from "../controllers/generateController.js";

let queue = [];
let activeJobs = 0;
const MAX = 1;

/**
 * Adds a new generation job to the queue and starts processing if possible
 * @param {Object} job - Contains req and res objects from Express
 */
export const addToQueue = (job) => {
  queue.push(job);
  processQueue();
};

/**
 * Processes the next job in the queue if the concurrency limit (MAX) allows it
 */
const processQueue = () => {
  if (queue.length === 0 || activeJobs >= MAX) return;

  const { docData, res } = queue.shift();
  activeJobs++;

  // Execute the main generation logic
  generateDoc(docData, res)
    .catch((err) => {
      console.error("ERROR: ", err.message);
      res.status(500).json({ error: "Failed to generate document" });
    })
    .finally(() => {
      activeJobs--;
      // Try to process the next job in line
      processQueue();
    });
};
