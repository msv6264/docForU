# Project Summary: docForU (Updated)

## 🚀 Overview

**docForU** is an AI-powered document and presentation generation platform designed to help users create **structured, ready-to-use academic content** such as PPTs and documents with precise control over headings, sections, and content distribution.

Unlike traditional AI generators that produce generic outputs, **docForU focuses on controlled generation**, where users can define how content should be structured (e.g., specific headings, number of slides/pages per section, and tone).

---

## 🎯 Current Focus (v1)

The system currently supports:

- AI-generated **structured JSON output**
- Conversion of structured data into **PowerPoint presentations (PPTX)**
- End-to-end flow from user input → AI → PPT download

---

## 🧩 System Architecture

The application follows a **multi-service architecture** with three main components:

---

## 1. Frontend (React + Vite + TailwindCSS)

### Role
User interface for collecting document requirements.

### Features
- User inputs:
  - Topic
  - Document type (PPT)
  - Number of slides
  - Optional structure and tone
- Data is stored in a unified `docData` object

### Goal
Simplify the experience into fewer steps for faster generation.

---

## 2. Backend (Node.js + Express)

### Role
AI orchestration and request handling.

### Core Responsibilities
- Exposes a `POST /generate` endpoint
- Receives structured input from frontend
- Constructs a controlled prompt using templates
- Sends request to AI model (currently Cerebras / single provider focus)
- Ensures output is in **strict JSON format**

### Key Improvement
- Shift from raw text generation → **structured JSON generation**
- Enables reliable document creation

---

## 3. DocCreator Service (Python + FastAPI)

### Role
Document rendering engine (JSON → file)

### Current Implementation
- `ppt_service.py`
  - Converts structured JSON into PPT slides
  - Handles:
    - Title slide
    - Section slides
    - Bullet points

### Work in Progress
- `docx_service.py` → DOCX generation
- `pdf_service.py` → PDF generation
- `routes/generate.py` → API integration

---

## 🔄 System Flow

1. User inputs topic and requirements (Frontend)  
2. Backend processes input and sends structured prompt to AI  
3. AI returns **structured JSON output**  
4. JSON is parsed and sent to DocCreator  
5. DocCreator generates PPT file  
6. File is returned to user for download  

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