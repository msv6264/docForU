import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { fillPromptTemplate } from "../utils/templateUtils.js";

export async function plcHoldrsOfPrmtTmplt(docObj) {
    const fileName = fileURLToPath(import.meta.url);
    const dirName = path.dirname(fileName);

    const templatePath = path.join(dirName, "..", "prompts", "prompts.txt");

    const prompTemp = await fs.promises.readFile(templatePath, "utf8");

    const text = fillPromptTemplate(prompTemp, docObj, docObj.docType);
    // console.log('I am from promptPlaceHolders, I want to tell that the document type is: ', docObj.docType);

    return text;

}