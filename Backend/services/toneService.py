from fastapi import HTTPException
from pathlib import Path

from ai.cerebras import prompt_to_cerebras
from utils.templateUtils import fill_prompt_template

async def refineTone(tone, dType):
    """
    Refines the provided tone or generation rules using Cerebras AI.
    """
    try:
        dir_name = Path(__file__).resolve().parent
        ref_prompt_path = dir_name.parent / "prompts" / "promptRefinement.txt"
        with open(ref_prompt_path, "r", encoding="utf-8") as f:
            read_prompt = f.read()

        # Note: the template filling logic expects the raw text
        fin_prompt = await fill_prompt_template(read_prompt, {"user_input": tone, "docType": dType}, dType)

        # Switched from OpenRouter to Cerebras
        refined_tone = await prompt_to_cerebras(fin_prompt)

        return refined_tone

    except Exception as err:
        print(f"Tone refinement failed: {err}")
        # Fallback to original tone if refinement fails
        return tone