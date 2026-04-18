from fastapi import FastAPI, HTTPException
from services.cleanDocData import prepDocData
import asyncio

def processData(docData):
    try:
        if not docData:
            raise HTTPException(status_code = 400, detail = "docData is required")
        
        # TO-DO: REMOVE LATER
        print("Hello! I am from generateController: ", docData)
        
        # 1. Prepare the document data with refined tone and formatting
        cleanDocObj = await prepDocData(docData)
        print("Hello! I am cleaned docObj from generateController: ", cleanDocObj)
    
    except Exception as e:
        raise HTTPException(status_code = 500, detail = str(e))