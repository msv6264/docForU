import axios from "axios";
import FormData from "form-data";
import fs from "fs";

import { prepareDocObject } from "../services/docService.js";
import { prmptToCerbras } from "../aiService/cerebras.js";
import { plcHoldrsOfPrmtTmplt } from "../utils/promptPlaceHolders.js";

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
    console.log("Hi, I am generateController.js, docData:", docData);

    const finalDocObj = await prepareDocObject(docData);
    console.log("final doc obj in genController: ", finalDocObj);

    const filledPrompt = await plcHoldrsOfPrmtTmplt(finalDocObj);

    const aiResponse = await prmptToCerbras(filledPrompt);
    console.log("AI responded:", aiResponse);

    const fastApiPost = await axios.post(
      "http://127.0.0.1:8000/genDoc",
      {
        dataJSON: aiResponse,
        docType: docData.docType,
      },
      {
        responseType: "arraybuffer",
      },
    );

    fs.writeFileSync("test.docx", fastApiPost.data);

    res.setHeader("Content-Type", fastApiPost.headers["content-type"]);

    res.setHeader(
      "Content-Disposition",
      fastApiPost.headers["content-disposition"],
    );

    return res.send(fastApiPost.data);
  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    return res.status(500).json({ error: "Generation failed" });
  }
}
