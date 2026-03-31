import { refineTone } from "./toneService.js";

export async function prepareDocObject(rawData) {
  if (!rawData.docType) {
    rawData.docType = "presentation";
  }

  if (rawData.rulesForDoc) {
    rawData.rulesForDoc = await refineTone(
      rawData.rulesForDoc,
      rawData.docType,
    );
    // console.log("refine prompt replaced, value is: ", rawData.rulesForDoc);
  } else {
    if (rawData.docType == "presentation") {
      rawData.rulesForDoc =
        "Use 4–6 bullet points per slide, Keep sentences short and concise, Avoid long paragraphs, Maintain simple language for audience, Emphasize key concepts";
    } else if (rawData.docType == "document") {
      rawData.rulesForDoc =
        "Write in formal paragraph format with detailed explanations. Maintain logical flow between sections and avoid bullet points.";
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
