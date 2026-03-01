import dotenv from "dotenv";
dotenv.config();

import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], 
});

export async function generateResp(prompt) {
  const response = await client.chat.completions.create({
    messages: [{role: "user", content: prompt}],
    model: "gpt-oss-120b",
  })

  return response.choices[0].message.content;
}

main();