import os
from pathlib import Path
from utils.templateUtils import fill_prompt_template

PROMPTS_DIR = Path(__file__).resolve().parent.parent / "prompts"

async def getFilledPrompt(docObj):
    """
    Reads the master prompt template and fills it with data.
    """
    master_template_path = PROMPTS_DIR / "prompts.txt"
    with open(master_template_path, "r", encoding="utf-8") as f:
        master_template = f.read()
        
    return await fill_prompt_template(master_template, docObj, docObj.get("docType", "document"))
