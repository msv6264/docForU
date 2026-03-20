import { refineTone } from "./toneService.js";

export async function prepareDocObject(rawData) {
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