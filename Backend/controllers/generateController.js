import { triggerDocGeneration } from "../api/docCreatorApi.js";
import { prepareDocObject } from "../services/docService.js";
import { prmptToCerbras } from "../ai/cerebras.js";
import { plcHoldrsOfPrmtTmplt } from "../utils/promptPlaceHolders.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Handles document generation requests using JSON input.
 * Orchestrates the flow: data processing → prompt creation → AI response → document generation.
 *
 * @param {Object} req - Express request object containing JSON body with docData
 * @param {Object} req.body.docData - Structured object with user input (no file upload)
 * @param {Object} res - Express response object to return generated file or error
 * @returns {Promise<void>}
 */
export async function generateDoc(docData, res) {
  try {
    if (!docData) {
      return res.status(400).json({ error: "docData is required" });
    }

    console.log("Hi, I am generateController.js, docData:", docData);

    // 1. Prepare the document data with refined tone and formatting
    const finalDocObj = await prepareDocObject(docData);
    // console.log("final doc obj in genController:", finalDocObj);

    // 2. Fill the prompt template with processed data
    const filledPrompt = await plcHoldrsOfPrmtTmplt(finalDocObj);
    // console.log("the filled prompt is:", filledPrompt);

    // 3. Send the prompt to Cerebras AI for content generation
    const aiResponse = await prmptToCerbras(filledPrompt);
    // console.log("AI responded:", aiResponse);

    // 4. Trigger document generation via FastAPI engine
    const fastApiPost = await triggerDocGeneration(
      aiResponse,
      docData.docType
    );

    // Set appropriate headers for file response
    res.setHeader(
      "Content-Type",
      fastApiPost.headers["content-type"] || "application/octet-stream"
    );

    if (fastApiPost.headers["content-disposition"]) {
      res.setHeader(
        "Content-Disposition",
        fastApiPost.headers["content-disposition"]
      );
    }

    // 5. Stream generated file back to client
    return res.send(fastApiPost.data);

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    return res.status(500).json({ error: err.message });
  }
}