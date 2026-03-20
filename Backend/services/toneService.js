import fs from "fs";
import path from "path";
import { sendToOpenRouter } from "../aiService/openrouter.js";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

export async function refineTone(tone, type) {
  const refPrompt = path.join(dirName, "prompts", "promptRefinement.txt");

  const readPrompt = await fs.promises.readFile(refPrompt, "utf8");

  let uncertainTone = "";
  if (type == "Presentation") {
    uncertainTone =
      "Use 4–6 bullet points per slide, Keep sentences short and concise, Avoid long paragraphs, Maintain simple language for audience, Emphasize key concepts";
  } else if (type == "document") {
    uncertainTone =
      "Write in formal paragraph format with detailed explanations. Maintain logical flow between sections and avoid bullet points.";
  } else if (type == "report") {
    uncertainTone =
      "Maintain an analytical tone with structured sections and data-based explanations. Use subheadings and summarize key insights clearly.";
  } else {
    uncertainTone =
      "Create a concise handout using bullet points and short explanations. Highlight key concepts and include simple definitions.";
  }

  const finPrompt = fillPromptTemplate(readPrompt, {
    tone,
    type,
    uncertainTone,
  });

  const finalTone = await sendToOpenRouter(finPrompt);

  return finalTone;
}
