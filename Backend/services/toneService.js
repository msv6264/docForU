import fs from "fs";
import path from "path";
import { sendToOpenRouter } from "../aiService/openrouter.js";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

export async function refineTone(tone, type) {
  const refPrompt = path.join(dirName, "prompts", "promptRefinement.txt");

  const readPrompt = await fs.promises.readFile(refPrompt, "utf8");

  const finPrompt = fillPromptTemplate(readPrompt, {
    tone,
    type,
  });

  const finalTone = await sendToOpenRouter(finPrompt);

  return finalTone;
}
