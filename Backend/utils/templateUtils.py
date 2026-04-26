import re
from pathlib import Path

async def fill_prompt_template(template, obj, docType):
    
    dir_name = Path(__file__).resolve().parent
    
    templatePathDoc = (dir_name / ".." / "prompts" / "doc_prompt.txt").resolve()
    templatePathPPT = (dir_name / ".." / "prompts" / "ppt_prompt.txt").resolve()
    
    if docType == "presentation":
        with open(templatePathPPT, "r", encoding="utf-8") as f:
            addInfo = f.read()
    else:
        with open(templatePathDoc, "r", encoding="utf-8") as f:
            addInfo = f.read()
    
    def replacer(match):
        key = match.group(1).strip()
        
        if key == "specs":
            return addInfo
        
        return str(obj.get(key, "")) 
    
    return re.sub(r"{{(.*?)}}", replacer, str(template))