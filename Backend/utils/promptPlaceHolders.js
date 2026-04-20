import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { fillPromptTemplate } from "../utils/templateUtils.js";

/**
 * Reads the prompt template and fills it with data from the document object
 * @param {Object} docObj - Content and configuration data for the document
 * @returns {Promise<string>} The fully constructed prompt string
 */
export async function plcHoldrsOfPrmtTmplt(docObj) {
    const fileName = fileURLToPath(import.meta.url);
    const dirName = path.dirname(fileName);

    const templatePath = path.join(dirName, "..", "prompts", "prompts.txt");

    const prompTemp = await fs.promises.readFile(templatePath, "utf8");

    const text = await fillPromptTemplate(prompTemp, docObj, docObj.docType);
    // console.log('I am from promptPlaceHolders, I want to tell that the document type is: ', docObj.docType);

    return text;

}