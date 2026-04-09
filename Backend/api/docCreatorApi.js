import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 * Communicates with Engine 1: Structured Generator (FastAPI / DocCreator)
 * @param {string} aiResponse - The AI generated JSON string
 * @param {string} docType - "document" or "presentation"
 * @returns {Promise<AxiosResponse>} The raw response containing the file buffer and headers
 */
export const triggerDocGeneration = async (aiResponse, docType) => {
  return await axios.post(
    `${process.env.FASTAPI_URL}/genDoc`,
    {
      dataJSON: aiResponse,
      docType: docType,
    },
    {
      responseType: "arraybuffer",
    }
  );
};
