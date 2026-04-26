# docForU: Generation Data Flow

This document outlines the step-by-step process of how user requests are internally routed inside the newly structured MVC backend before finally resolving as a generated presentation or document.

## Flow Visualization

```mermaid
sequenceDiagram
    autonumber
    participant User as User / Frontend
    participant Route as Express Router
    participant Controller as Controller
    participant Service as Business Services
    participant ai as AI Interfaces
    participant Python as Backend Service

    User->>Route: HTTP POST /generate<br/>(File + docData JSON)
    activate Route

    Route->>Controller: Forward Request Context
    activate Controller

    %% Tone formatting if requested
    Controller->>Service: invoke ToneService
    activate Service
    Service->>ai: OpenRouter Request
    activate ai
    ai-->>Service: Structured Tone Constraints
    deactivate ai
    Service-->>Controller: Refined Instructions
    deactivate Service

    %% Prompt generation
    Controller->>Service: invoke DocService (Build Prompt)
    activate Service
    Service->>ai: Cerebras API Gen Request
    activate ai
    ai-->>Service: AI Generated JSON Text
    deactivate ai
    Service-->>Controller: Parse and Return Structured Payload
    deactivate Service

    %% Document Delegation
    Controller->>Python: Internal HTTP Request to Python Routes
    activate Python
    Python-->>Controller: Compiled Native File (e.g., PPTX)
    deactivate Python

    Controller-->>Route: Formulate Delivery Payload
    deactivate Controller

    Route-->>User: HTTP 200 OK File Delivered
    deactivate Route
```

## Step-by-Step Breakdown

1. **User Request Initiation**: The frontend submits a compiled JSON of all user preferences (`docData`) and optionally attached files via a `POST /generate` request.
2. **Routing the Request**: The `routes` layer (e.g., `generateRoute.js`) securely captures the HTTP traffic and passes the parameters onward.
3. **Controller Orchestration**: The `generateController.js` governs the overall workflow. It evaluates the uploaded parameters.
5. **Content Generation Service**: The main body of work moves to `docService.js`. Here, templated prompts are constructed. It invokes `ai/cerebras.js` to securely generate the content, returning structured JSON blocks.
6. **Microservice Delegation**: The core data is finalized as structured JSON. The controller then forwards the rendering responsibilities to the FastAPI-powered **Backend** service over its internal route endpoints.
7. **Document Compilation**: A specific service script (e.g., `services/ppt_service.py` inside the Python environment) translates the JSON hierarchy into actual slides and titles.
8. **Delivery**: The binary data flows back from Backend, to the Express controller, through the router, and ultimately back to the user's browser for download.
