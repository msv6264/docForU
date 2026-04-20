import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fillPromptTemplate } from "../utils/templateUtils.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

export async function refineTone(tone, type) {
  const refPrompt = path.join(dirName, "..", "prompts", "promptRefinement.txt");

  const readPrompt = await fs.promises.readFile(refPrompt, "utf8");

  const finPrompt = fillPromptTemplate(readPrompt, {
    tone,
    type,
  });

  return finPrompt;
}
