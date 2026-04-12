import { refineTone } from "./toneService.js";

/**
 * Prepares the raw data for document generation by refining instructions and formatting sections.
 * @param {Object} rawData - The raw input data from the user
 * @returns {Promise<Object>} The processed document object ready for templating
 */
export async function prepareDocObject(rawData) {
  if (!rawData.docType) {
    rawData.docType = "presentation";
  }

  // Refine the generation rules based on provided tone or default guidelines
  if (rawData.rulesForDoc) {
    rawData.rulesForDoc = await refineTone(
      rawData.rulesForDoc,
      rawData.docType,
    );
    // console.log("refine prompt replaced, value is: ", rawData.rulesForDoc);
  } else {
    // Default fallback rules if none provided
    if (rawData.docType == "presentation") {
      rawData.rulesForDoc =
        "Use 4–6 bullet points per slide, Keep sentences short and concise, Avoid long paragraphs, Maintain simple language for audience, Emphasize key concepts";
    } else if (rawData.docType == "document") {
      rawData.rulesForDoc =
        "Write in formal paragraph format with detailed explanations. Maintain logical flow between sections and avoid bullet points.";
    }
  }

  // Format section breakdown into a text string
  const formattedSec = (rawData.sections || [])
    .map((section) => `${section.name} : ${section.count}`)
    .join("\n");

  return {
    ...rawData,
    sectionBreakdown: formattedSec,
  };
}
