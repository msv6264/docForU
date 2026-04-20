import { refineTone } from "./toneService.js";

export async function prepareDocObject(rawData) {
  if (!rawData.docType) {
    rawData.docType = "presentation";
  }

  if (rawData) {
    rawData.rulesForDoc = await refineTone(
      rawData.docType,
    );
  } 

  const formattedSec = (rawData.sections || [])
    .map((section) => `${section.name} : ${section.count}`)
    .join("\n");

  return {
    ...rawData,
    sectionBreakdown: formattedSec,
  };
}
