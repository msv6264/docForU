import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";

dotenv.config();

const client = new OpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY
});

export async function sendToOpenRouter(prompt) {

  const completion = await client.chat.completions.create({
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