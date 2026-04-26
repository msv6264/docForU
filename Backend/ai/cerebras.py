import os
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras

load_dotenv()

client = Cerebras(
    api_key=os.getenv("CEREBRAS_API_KEY"),
)

async def prompt_to_cerebras(prompt: str) -> str:
    """
    Sends a prompt to the Cerebras AI model for completion.
    """
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model="qwen-3-235b-a22b-instruct-2507",
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error in Cerebras AI call: {e}")
        raise e
