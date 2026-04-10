import env from "../config/env.js";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

const client = new Cerebras({
  apiKey: env.CEREBRAS_API_KEY,
});

export async function prmptToCerbras(prompt) {

  const response = await client.chat.completions.create({
    messages: [
      { role: "user", content: prompt }
    ],
    model: "qwen-3-235b-a22b-instruct-2507",
  });

  return response.choices[0].message.content;
}