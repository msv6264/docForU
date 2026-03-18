# docForU: Generation Data Flow

This document outlines the step-by-step process of how user requests are handled by the system, from the initial upload to the final AI-generated response.

## Flow Visualization

```mermaid
sequenceDiagram
    autonumber
    participant User as User / Frontend
    participant Server as Express Backend
    participant Storage as File System / Templates
    participant AI as Cerebras AI / OpenRouter

    User->>Server: HTTP POST /generate<br/>(File + docData JSON)
    activate Server
    
    Server->>Server: Validate File <br/>(MIME type & size using multer)
    Note right of Server: Verifies allowed formats<br/>(images/documents)
    
    Server->>Server: Prepare Document Object<br/>(Refine Tone with OpenRouter if needed)
    
    Server->>Storage: Read Prompt Template<br/>(prompts.txt)
    activate Storage
    Storage-->>Server: Return Template text
    deactivate Storage
    
    Server->>Server: Insert Placeholders<br/>(Inject docData into Template)
    
    Server->>AI: Call AI Generation<br/>(Send compiled prompt to Cerebras)
    activate AI
    AI-->>Server: Return AI Generated Text
    deactivate AI
    
    Server-->>User: HTTP 200 OK<br/>(AI Result JSON)
    deactivate Server
```

## Step-by-Step Breakdown

1. **User Request Initiation**: The user uploads a file and submits the structured configuration (`docData`) via the frontend wizard.
2. **Payload Validation**: The backend utilizes `multer` to validate the uploaded file, enforcing size limits and verifying allowed MIME types/extensions.
3. **Data Preparation**: The system prepares the `docData` object. If the user provided tone rules, the backend may call **OpenRouter** to refine these instructions into precise LLM constraints.
4. **Template Retrieval**: The specific prompt template (`prompts.txt`) is read from the local file system.
5. **Prompt Compilation**: The system maps the properties of `docData` into the template placeholders to formulate a comprehensive set of instructions.
6. **AI Content Generation**: The finalized prompt string is dispatched to the **Cerebras AI** API for rapid, high-quality content generation.
7. **Response Delivery**: The generated markdown or structured text is wrapped in a JSON response and returned to the frontend.