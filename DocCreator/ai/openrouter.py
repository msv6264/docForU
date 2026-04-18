import requests
import json
import os

OPEN_ROUTER_API_KEY = os.getenv("OPEN_ROUTER_API_KEY")


def send_to_openrouter(prompt: str) -> str:
    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPEN_ROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps({
            # model: "deepseek/deepseek-chat:free",
            # model: "openrouter/free",
                "model": "nvidia/nemotron-3-nano-30b-a3b:free",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            })
        )

        data = response.json()

        return data["choices"][0]["message"]["content"]

    except Exception as e:
        raise Exception(f"Error calling OpenRouter: {str(e)}")