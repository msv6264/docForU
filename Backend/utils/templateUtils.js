import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function fillPromptTemplate(template, obj, docType) {
  let addInfo = "";

  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);

  const templatePathDoc = path.join(dirName, "..", "prompts", "doc_prompt.txt");
  const templatePathPPT = path.join(dirName, "..", "prompts", "ppt_prompt.txt");

  if (docType === "Presentation") {
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