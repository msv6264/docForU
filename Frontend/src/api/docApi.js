const API_URL = import.meta.env.VITE_API_URL;

export const generateDoc = async (formData) => {
  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return await response.blob();
};