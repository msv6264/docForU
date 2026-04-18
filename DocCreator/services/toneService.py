from fastapi import HTTPException
from pathlib import Path

from ai.openrouter import send_to_openrouter
from utils.templateUtils import fill_prompt_template

async def refineTone(tone, dType):
    try:
        dir_name = Path(__file__).resolve().parent
        ref_prompt_path = dir_name / "prompts" / "promptRefinement.txt"
        with open(ref_prompt_path, "r", encoding="utf-8") as f:
            read_prompt = f.read()

        fin_prompt = await fill_prompt_template(read_prompt, tone, dType)

        final_tone = await send_to_openrouter(fin_prompt)

        return final_tone

    except Exception as err:
        raise HTTPException(
            status_code=500,
            detail=f"Error refining tone: {str(err)}"
        )