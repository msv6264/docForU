# docForU: System Architecture

The **docForU** project is designed as a multi-tier web application. Recently refactored to enforce separation of concerns, the architecture relies on a distinct front end, an MVC/Service-oriented Node.js AI orchestration backend, and a specialized Python document generation microservice.

## High-Level Architecture Diagram

```mermaid
graph TD
    %% Define Nodes
    User([User / Browser])

    subgraph Frontend [Frontend: React + Vite + Tailwind CSS]
        UI[UI Components & Forms]
        State[React State: docData]
        Router[React Router Wizards]
    end

    subgraph Backend [Backend: Node.js + Express (MVC)]
        APIRoute[Routes: API Endpoints]
        Controller[Controllers: Request Handling]

        subgraph Services [Business Logic]
            ToneSvc[Tone Service]
            DocSvc[Doc Service]
        end

        subgraph AIServices [AI Interfaces]
            OpenRouterSvc[OpenRouter Client]
            CerebrasSvc[Cerebras AI Client]
        end
    end

    subgraph DocCreator [DocCreator: Python + FastAPI]
        DocAPIRoute[Routes: API Endpoints]
        subgraph PythonServices [Document Compilers]
            PDF[pdf_service.py]
            DOCX[docx_service.py]
            PPT[ppt_service.py]
        end
    end

    %% External APIs
    OpenRouterAPI((OpenRouter API))
    CerebrasAPI((Cerebras AI API))

    %% Data Flow
    User -->|Interacts with wizard| UI
    UI -->|Updates state| State
    State -->|POST /generate docData| APIRoute

    APIRoute -->|Forwards Request| Controller

    Controller -->|Refines instructions| ToneSvc
    ToneSvc -->|Formats Constraints| OpenRouterSvc
    OpenRouterSvc <-->|LLM Tone Refinement| OpenRouterAPI

    Controller -->|Builds prompts| DocSvc
    DocSvc -->|Requests Content| CerebrasSvc
    CerebrasSvc <-->|LLM Content Generation| CerebrasAPI

    Controller -.->|Delegates Payload| DocAPIRoute

    DocAPIRoute -->|Parses structured text| PythonServices
    PythonServices --> PDF
    PythonServices --> DOCX
    PythonServices --> PPT

    PDF -.->|Returns document| User
    DOCX -.->|Returns document| User
    PPT -.->|Returns presentation| User

    %% Styling
    classDef frontend fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000;
    classDef backend fill:#8CC84B,stroke:#333,stroke-width:2px,color:#000;
    classDef doccreator fill:#3776AB,stroke:#333,stroke-width:2px,color:#fff;
    classDef external fill:#F9A826,stroke:#333,stroke-width:2px,color:#000;

    class Frontend frontend;
    class Backend backend;
    class DocCreator doccreator;
    class OpenRouterAPI,CerebrasAPI external;
```

---

## 1. Frontend Layer (React + Vite)

- **Role:** Web client providing a user-friendly document configuration wizard.
- **Tech Stack:** React, Vite, Tailwind CSS, React Router DOM.
- **Flow:** Users progress through multiple wizard pages configuring topics, document types, sizes, structure, and rules. The accumulated settings (`docData`) are submitted to the backend sequentially.

## 2. Backend Orchestration Layer (Node.js + Express)

- **Role:** Central middleware organizing the business logic and managing AI LLM integrations in an MVC pattern.
- **Tech Stack:** Node.js, Express.
- **Structural Layout:**
  - **`routes/` (e.g., `generateRoute.js`):** Intercepts API payloads from the Frontend and routes them to particular controller actions.
  - **`controllers/` (e.g., `generateController.js`):** Directs the overall request logic, ensuring data passes safely across different application units.
  - **`services/` (e.g.`docService.js`):** Contains pure business operations such as preparing generation templates (`prompts/`) and compiling instructions based on user choices.
  - **`ai/` (e.g., `openrouter.js`, `cerebras.js`):** Exclusively manages external LLM providers and HTTP requests fetching AI results.

## 3. DocCreator Microservice (Python + FastAPI)

- **Role:** A dedicated worker service for building native documents. Utilizing Python explicitly takes advantage of its robust native rendering libraries.
- **Tech Stack:** Python, FastAPI.
- **Structural Layout:**
  - **`routes/` (e.g., `generate.py`):** The internal API called by the Node backend upon the completion of language generation.
  - **`services/` (e.g., `ppt_service.py`):** Domain-specific compilation scripts that parse the structured JSON returned from Cerebras/Node and stitch together exact file equivalents (presentations, word documents, PDFs).
