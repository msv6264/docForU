/**
 * Prepares the raw data for document generation by refining instructions and formatting sections.
 * @param {Object} rawData - The raw input data from the user
 * @returns {Promise<Object>} The processed document object ready for templating
 */

export async function prepareDocObject(rawData) {
  if (!rawData.docType) {
    rawData.docType = "presentation";
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
