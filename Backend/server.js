import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
// import { generateResp } from "./apiConnect.js";


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

// const dummyCheck = async () => {
//   const dummyDocObj = {
//     categoryOfFile: "Business",
//     topicName: "Startup",
//     focusAreaOfTopic: "Funding Strategy",
//     docType: "ppt",
//     noOfSlides: "5",
//     sections: [
//       { id: 1, name: "Title Slide", count: 1, locked: true },
//       { id: 2, name: "Introduction", count: 1, locked: false },
//       { id: 3, name: "Main Content", count: 1, locked: false },
//       { id: 4, name: "Conclusion", count: 1, locked: false },
//       { id: 5, name: "References", count: 1, locked: false },
//     ],
//     rulesForDoc: "Use simple language"
//   };

//   const formattedSec = dummyDocObj.sections
//     .map(section => `${section.name} : ${section.count}`)
//     .join("\n")

//   dummyDocObj.sectionBreakdown = formattedSec;

//   try {
//     const templatePath = path.join(dirName, "prompts.txt");

//     const prompTemp = await fs.promises.readFile(templatePath, "utf8");

//     const text = fillPrompTemplate(prompTemp, dummyDocObj);

//     console.log("FINAL OUTPUT:\n");
//     console.log(text);

//   } catch (err) {
//     console.error("Error:", err);
//   }
// };

// dummyCheck();

app.post("/receive-data", upload.single("file"), async(req, res) => {
  // req.body has file and docData 2 obj's and docData is obj only
  // req.body.docData gives the docDaa obj
              
  const docObj = JSON.parse(req.body.docData) //contains docData obj
  // without json.parse docData is received as string

  const formattedSec = docObj.sections
  .map(section => `${section.name} : ${section.count}`)
  .join("\n")

  docObj.sectionBreakdown = formattedSec;
  console.log(docObj);

  const templatePath = path.join(dirName, "prompts.txt"); //contains path of file
  const prompTemp = await fs.promises.readFile(templatePath, "utf8"); //reading the file and storing its data
  const text = fillPrompTemplate(prompTemp, docObj); // replaces placeholders witth data of obj

  console.log(text);
  res.json({ message: "Received successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});