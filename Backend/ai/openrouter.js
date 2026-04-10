import env from "../config/env.js";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

export async function sendToOpenRouter(prompt) {

  const completion = await client.chat.completions.create({
    // model: "deepseek/deepseek-chat:free",
    //     model: "openrouter/free",
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return completion.choices[0].message.content;
}