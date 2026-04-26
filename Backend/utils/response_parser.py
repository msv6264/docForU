import json

def parse_ai_json(response_text: str):
    """
    Cleans and parses JSON from AI response, handling potential markdown blocks.
    """
    try:
        clean_json = response_text.strip()
        if clean_json.startswith("```json"):
            clean_json = clean_json[7:-3].strip()
        elif clean_json.startswith("```"):
            clean_json = clean_json[3:-3].strip()
        
        return json.loads(clean_json)
    except Exception as e:
        print(f"Error parsing AI JSON: {e}")
        return None
