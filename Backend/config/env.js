import dotenv from "dotenv";
dotenv.config();

/**
 * Environment configuration object that centralizes access to process.env variables
 */
const env = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL,
  FASTAPI_URL: process.env.FASTAPI_URL,
  CEREBRAS_API_KEY: process.env.CEREBRAS_API_KEY,
  OPEN_ROUTER_API_KEY: process.env.OPEN_ROUTER_API_KEY,
};

export default env;