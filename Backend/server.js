import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { generateResp } from "./apiConnect.js";


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
function fillPrompTemplate(prompTemplate, obj) {
  return prompTemplate.replace(/{{(.*?)}}/g, (_, key) => {
    return obj[key.trim()] ?? "";
  });
}

const upload = multer({
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

async function genDocument(docObj) {
  const templatePath = path.join(dirName, "prompts.txt"); //contains path of file
  const prompTemp = await fs.promises.readFile(templatePath, "utf8"); //reading the file and storing its data

  const text = fillPrompTemplate(prompTemp, docObj); // replaces placeholders witth data of obj

  return text;
}

function prepareDocObject(rawData) {
  // req.body has file and docData 2 obj's and docData is obj only
  // req.body.docData gives the docDaa obj
              
  const docObj = JSON.parse(rawData);//contains docData obj
    // without json.parse docData is received as string

  if (!docObj.docType){
    docObj.docType = "PPT"
  }

  const formattedSec = (docObj.sections || [])
    .map(section => `${section.name} : ${section.count}`)
    .join("\n");

  return {
    ...docObj,
    sectionBreakdown: formattedSec
  };
}

app.post("/generate", upload.single("file"), async (req, res) => {
  try {
    const preparedDocObj = prepareDocObject(req.body.docData);

    const result = await genDocument(preparedDocObj);

    const aiResponse = await generateResp(result);
    console.log(aiResponse);

    res.json({ generatedText: aiResponse });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
})

app.listen(5000, () => {
  console.log("Server running on port 5000");
});