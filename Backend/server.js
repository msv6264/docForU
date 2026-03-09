import express, { raw } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { prmptToCerbras } from "./ai/cerebras.js";
import { sendToOpenRouter } from "./ai/openrouter.js";
import axios from "axios";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// in place of obj docData obj is sent
function fillPromptTemplate(prompTemplate, obj) {
  return prompTemplate.replace(/{{(.*?)}}/g, (_, key) => {
    return obj[key.trim()] ?? "";
  });
}

const isValidFile = multer({
  limits: { fileSize: 10 * 1024 * 1024 },

  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".pdf",
      ".pptx",
      ".docx",
    ];

    if (
      allowedMimeTypes.includes(file.mimetype) &&
      allowedExtensions.includes(ext)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type, only images and documents are allowed"),
        false,
      );
    }
  },
});

async function plcHoldrsOfPrmtTmplt(docObj) {
  const templatePath = path.join(dirName, "prompts", "prompts.txt");

  const prompTemp = await fs.promises.readFile(templatePath, "utf8");

  const text = fillPromptTemplate(prompTemp, docObj);

  return text;
}

async function refineTone(tone, type) {
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

async function prepareDocObject(rawData) {
  if (!rawData.docType) {
    rawData.docType = "Presentation";
  }

  if (rawData.rulesForDoc) {
    rawData.rulesForDoc = await refineTone(
      rawData.rulesForDoc,
      rawData.docType,
    );
    console.log("refine prompt replaced, value is: ", rawData.rulesForDoc);
  } else {
    if (rawData.docType == "Presentation") {
      rawData.rulesForDoc =
        "Use 4–6 bullet points per slide, Keep sentences short and concise, Avoid long paragraphs, Maintain simple language for audience, Emphasize key concepts";
    } else if (rawData.docType == "document") {
      rawData.rulesForDoc =
        "Write in formal paragraph format with detailed explanations. Maintain logical flow between sections and avoid bullet points.";
    } else if (rawData.docType == "report") {
      rawData.rulesForDoc =
        "Maintain an analytical tone with structured sections and data-based explanations. Use subheadings and summarize key insights clearly.";
    } else {
      rawData.rulesForDoc =
        "Create a concise handout using bullet points and short explanations. Highlight key concepts and include simple definitions.";
    }
  }

  const formattedSec = (rawData.sections || [])
    .map((section) => `${section.name} : ${section.count}`)
    .join("\n");

  return {
    ...rawData,
    sectionBreakdown: formattedSec,
  };
}

app.post("/generate", isValidFile.single("file"), async (req, res) => {
  try {
    const docData = JSON.parse(req.body.docData);
    const updatedDocObj = await prepareDocObject(docData);

    // console.log(updatedDocObj);

    const filledPrompt = await plcHoldrsOfPrmtTmplt(updatedDocObj);
    // console.log(filledPrompt);

    const aiResponse = await sendToOpenRouter(filledPrompt);
    console.log(aiResponse);

    // res.json({ generatedText: aiResponse });

    const fastApiPost = await axios.post("http://127.0.0.1:8000/genDoc", {
      dataJSON: aiResponse,
      docType: docData.docType
    });

    return res.json({
      generatedText: aiResponse,
      document: fastApiPost.data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
