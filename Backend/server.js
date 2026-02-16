const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

// const upload = multer({
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter: function (req, file, callback) {
//     const allowedTypes = {
//       report: ["pdf", "docx"],
//       detailedReport: ["pdf", "docx", "pptx", "xlsx"],
//       handout: ["pdf", "docx", "pptx"],
//       referenceMaterial: ["pdf", "docx", "txt", "md", "xlsx"],
//     };

//     const docData = JSON.parse(req.body.docData || "{}");
//     const category = docData.category; this is not wanted category !!!!

//     if (!ca)
// });

app.post("/receive-data", upload.single("file"), (req, res) => {
  console.log("file:", req.file);
  console.log("raw data:", req.body);

  const docData = JSON.parse(req.body.docData || "{}");
  console.log("Parsed data:", docData);

  res.json({ message: "Received successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
