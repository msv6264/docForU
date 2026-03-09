# Project Summary: docForU

**docForU** is a multi-service web application designed to help users generate documents and presentations (such as PDFs, DOCX, PPTX files) using AI. The project is separated into three main parts: 

## 1. Frontend (React + Vite + TailwindCSS)
- **Role:** The user-facing application where the user configures the document they want to generate.
- **Structure:** It's built as a step-by-step wizard using React Router. The user progresses through several screens to define their document:
  - `Home`
  - `TopicName` (Topic and focus area)
  - `DocTypeSize` (Type of document and number of slides/pages)
  - `StrucOfDoc` (Sections and structuring, e.g., Introduction, Main Content, Conclusion)
  - `RulesForDoc` (Tone and specific rules)
- **State Management:** All document requirements are collected into a `docData` state object which is passed along the routes.

## 2. Backend (Node.js + Express)
- **Role:** The AI Prompting and Orchestration layer.
- **AI Integrations:** It utilizes the `@openrouter/sdk`, `@cerebras/cerebras_cloud_sdk`, and `@google/genai`. 
- **Core Logic ([server.js](file:///c:/docForU/Backend/server.js)):** 
  - Exposes a POST `/generate` endpoint.
  - Takes the `docData` from the Frontend.
  - Checks if the user has requested a specific tone (`rulesForDoc`). If so, it uses **OpenRouter** to refine and format the tone/instructions for the system.
  - Constructs a detailed prompt using predefined templates in the `prompts` directory.
  - Sends this prompt to **Cerebras** to generate the actual textual content for the document.

## 3. DocCreator (Python + FastAPI)
- **Role:** The Document Generation/Conversion microservice.
- **Current State:** 
  - Contains a `services/` directory with [docx_service.py](file:///c:/docForU/DocCreator/services/docx_service.py), [pdf_service.py](file:///c:/docForU/DocCreator/services/pdf_service.py), and [ppt_service.py](file:///c:/docForU/DocCreator/services/ppt_service.py), indicating its primary job is to take generated text and convert it into downloadable `.docx`, `.pdf`, or `.pptx` files.
  - It uses FastAPI ([main.py](file:///c:/docForU/DocCreator/main.py) is present with health check routes).
  - Parts of this service might still be a work-in-progress (e.g., [routes/generate.py](file:///c:/docForU/DocCreator/routes/generate.py) was found empty).

### Synthesis
The system architecture flows roughly like this:
1. **User (Frontend)** configures document parameters ->
2. **Backend (Node.js)** receives parameters, refines the AI prompt, and hits an LLM (Cerebras) to generate the raw text and structure ->
3. **DocCreator (FastAPI)** (presumably) will take that structured text to compile the final `.pdf/.docx/.pptx` file.
