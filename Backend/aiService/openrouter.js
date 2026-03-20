import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

export async function sendToOpenRouter(prompt) {

  const completion = await client.chat.completions.create({
    // model: "deepseek/deepseek-chat:free",
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

// import dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();

// const client = new OpenAI({
//   apiKey: process.env.OPEN_ROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1"
// });

// export async function sendToOpenRouter(prompt) {

//   const completion = await client.chat.completions.create({
//     model: "openrouter/free",
//     messages: [
//       {
//         role: "user",
//         content: prompt
//       }
//     ]
//   });

//   return completion.choices[0].message.content;
// }