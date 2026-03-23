# Project Summary: docForU

## 🚀 Overview

**docForU** is an AI-powered document and presentation generation platform designed to help users create **structured, ready-to-use content** such as PPTs and documents with precise control over headings, sections, and content distribution.

Unlike traditional AI generators that produce generic outputs, **docForU focuses on controlled generation**, where users can define how content should be structured (e.g., specific headings, number of slides/pages per section, and tone).

---

## 🎯 Current Focus (v1)

The system currently supports:
- AI-generated **structured JSON output**
- Conversion of structured data into **PowerPoint presentations (PPTX)**
- End-to-end flow from user input → AI orchestration → Document generation → Download

---

## 🧩 System Architecture

The application follows a **multi-service architecture** with three main components:

---

## 1. Frontend (React + Vite + Tailwind CSS)

### Role
User interface for collecting document requirements.

### Features
- Step-by-step wizard for user inputs:
  - Topic
  - Document type and size (e.g., PPT, number of slides)
  - Desired structure and tone
- Aggregated data is stored in a unified state object (`docData`).

---

## 2. Backend (Node.js + Express)

### Role
AI orchestration and request handling.

### Core Structure (MVC & Services)
The backend is structured into specialized modules to enforce a clean separation of concerns:
- **`routes/`**: Defines API endpoints (e.g., `POST /generate`).
- **`controllers/`**: Coordinates the request logic, parsing inputs and delegating tasks.
- **`services/`**: Core business logic.
  - `docService.js`: Prepares templates and handles prompt building.
  - `toneService.js`: Interprets user styling rules and refines them.
- **`aiService/`**: Interfaces with external LLM providers.
  - `cerebras.js`: Manages rapid content generation.
  - `openrouter.js`: Handles tone/instruction refinement.

### Goal
Ensures the output is returned in **strict structured JSON format**, abstracting the complexities of AI prompt engineering from the presentation layer.

---

## 3. DocCreator Service (Python + FastAPI)

### Role
Document rendering engine (Structured Data → Native File format).

### Core Structure
- **`routes/`**: Exposes internal API endpoints for the main backend (e.g., `/generate`).
- **`services/`**: Specialized document compilers utilizing Python's robust rendering libraries.
  - `ppt_service.py`: Converts structured JSON into PPTX slides.
  - `docx_service.py`: Generates Word documents (WIP).
  - `pdf_service.py`: Generates PDF documents (WIP).

---

## 🔄 System Flow

1. **Input**: User inputs topic and requirements through the Frontend wizard.
2. **Orchestration**: Express backend controller receives the request, delegates refinement and prompt building to respective services.
3. **Generation**: `aiService` communicates with LLM providers to return **structured JSON output**.
4. **Compilation**: The Controller passes the generated structured JSON to the Python DocCreator service via internal API routing.
5. **Rendering**: DocCreator's specific format service (e.g., `ppt_service.py`) generates the native file.
6. **Delivery**: The compiled file is returned to the user for download.

---

## 📦 Example JSON Structure

```json
{
  "title": "Artificial Intelligence",
  "slides": [
    {
      "heading": "Introduction",
      "points": ["Definition of AI", "Importance of AI"]
    }
  ]
}
```