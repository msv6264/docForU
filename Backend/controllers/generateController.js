import axios from "axios";
import FormData from "form-data";
import fs from "fs";

import { prepareDocObject } from "../services/docService.js";
import { prmptToCerbras } from "../aiService/cerebras.js";
import { fillPromptTemplate } from "../utils/templateUtils.js";

export async function generateDoc(req, res) {
  try {
    const file = req.file;

    let docData;
    try {
      docData = JSON.parse(req.body.docData);
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON in docData" });
    }

    console.log("FILE:", file?.originalname);
    console.log("docData:", docData);

    const finalDocObj = await prepareDocObject(docData);

    const filledPrompt = await fillPromptTemplate(finalDocObj);

    const aiResponse = await prmptToCerbras(filledPrompt);
    console.log("AI responded:", aiResponse);

    const formData = new FormData();

    formData.append("docType", docData.docType);
    formData.append("dataJSON", JSON.stringify(aiResponse));

    if (file) {
      formData.append("file", fs.createReadStream(file.path));
    }

    const fastApiResponse = await axios.post(
      "http://127.0.0.1:8000/genDoc",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) console.error("File delete failed:", err);
      });
    }

    return res.json({
      success: true,
      generatedText: aiResponse,
      document: fastApiResponse.data,
    });

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    return res.status(500).json({ error: "Generation failed" });
  }
}