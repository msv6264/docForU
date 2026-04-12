import fs from "fs";
import path from "path";
import { sendToOpenRouter } from "../ai/openrouter.js";
import { fileURLToPath } from "url";
import { fillPromptTemplate } from "../utils/templateUtils.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

/**
 * Refines the provided tone or generation rules using an AI model to ensure clarity and professionalism
 * @param {string} tone - The original tone or rules text
 * @param {string} type - "document" or "presentation"
 * @returns {Promise<string>} The refined tone/rules string
 */
export async function refineTone(tone, type) {
  const refPrompt = path.join(dirName, "prompts", "promptRefinement.txt");

  const readPrompt = await fs.promises.readFile(refPrompt, "utf8");

  // Fill the refinement template with current tone and type
  const finPrompt = await fillPromptTemplate(readPrompt, {
    tone,
    type,
  });

  // Get refined text from OpenRouter AI
  const finalTone = await sendToOpenRouter(finPrompt);

  return finalTone;
}
