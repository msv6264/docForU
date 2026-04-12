import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Replaces placeholders in a template string with actual data from an object
 * @param {string} template - The template string with {{key}} placeholders
 * @param {Object} obj - The data source object
 * @param {string} docType - "document" or "presentation" (used to select specific sub-template)
 * @returns {Promise<string>} The populated template string
 */
export async function fillPromptTemplate(template, obj, docType) {
  let addInfo = "";

  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);

  const templatePathDoc = path.join(dirName, "..", "prompts", "doc_prompt.txt");
  const templatePathPPT = path.join(dirName, "..", "prompts", "ppt_prompt.txt");

  if (docType === "presentation") {
    addInfo = await fs.promises.readFile(templatePathPPT, "utf8");
  } else {
    addInfo = await fs.promises.readFile(templatePathDoc, "utf8");
  }

  return String(template).replace(/{{(.*?)}}/g, (_, key) => {
    key = key.trim();

    if (key === "specs") {
      return addInfo;
    }

    return obj[key] ?? "";
  });
}