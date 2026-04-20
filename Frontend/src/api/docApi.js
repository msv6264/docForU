const API_URL = import.meta.env.VITE_API_URL;

/**
 * Sends a request to the backend to generate a document or presentation
 * @param {Object} data - The document configuration and content data
 * @returns {Promise<Blob>} The generated file as a blob
 */
export const generateDoc = async (data) => {
  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return await response.blob();
};