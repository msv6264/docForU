const API_URL = import.meta.env.VITE_API_URL;

/**
 * Sends a request to the backend to generate a document or presentation
 * @param {Object} docData - The document configuration and content docData
 * @returns {Promise<Blob>} The generated file as a blob
 */
export const generateDoc = async (docData) => {
  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docData),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return await response.blob();
};
