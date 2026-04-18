import asyncio
from services.toneService import refineTone

async def prepDocData(rawData):
    if not rawData.docType:
        rawData.docType = "presentation"
        
    if rawData.rulesForDoc:
        rawData.rulesForDoc = await refineTone(
        rawData.rulesForDoc,
        rawData.docType,
        )
        
        # TO-DO: REMOVE LATER
        print("refine prompt replaced, value is: ", rawData.rulesForDoc)
        
    