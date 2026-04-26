async def prepDocData(raw_data: dict):
    """
    Prepares the raw data for document generation by formatting sections and ensuring docType.
    """
    doc_type = raw_data.get("docType", "presentation")
    raw_data["docType"] = doc_type

    # Ensure rules exist, use defaults if not provided
    if not raw_data.get("rulesForDoc"):
        if doc_type == "presentation":
            raw_data["rulesForDoc"] = "Use 4–6 bullet points per slide, Keep sentences short and concise, Avoid long paragraphs, Maintain simple language for audience, Emphasize key concepts"
        else:
            raw_data["rulesForDoc"] = "Write in formal paragraph format with detailed explanations. Maintain logical flow between sections and avoid bullet points."

    # Format section breakdown into a text string
    sections = raw_data.get("sections", [])
    formatted_sec = "\n".join([f"{s.get('name')} : {s.get('count')}" for s in sections])
    
    raw_data["sectionBreakdown"] = formatted_sec
    return raw_data