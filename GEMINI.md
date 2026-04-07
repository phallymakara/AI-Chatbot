# Gemini CLI Context: AI Chatbot System

This project is a full-stack AI chatbot platform designed with a modular architecture, utilizing Retrieval-Augmented Generation (RAG) to provide answers based on ingested documents.

**Note: Authentication has been removed for simplified anonymous access.**

## Project Overview

*   **Backend:** FastAPI (Python) serving as the core API, handling chat logic, search, and integration with Azure services.
*   **Frontend:** React (TypeScript, Vite) providing a modern user interface for chat and administration.
*   **Ingestion Pipeline:** Azure Functions (Python) that automatically process documents uploaded to Azure Blob Storage, generating embeddings and indexing them in Azure AI Search.
*   **AI Services:** Azure OpenAI (GPT-4/GPT-3.5) for text generation and embeddings.
*   **Search Engine:** Azure AI Search for vector and keyword retrieval.
*   **Authentication:** **REMOVED**. The system currently operates with anonymous access and a default `tenant_id` ("default").

## Architecture

1.  **User Interface:** React app with Tailwind CSS and Radix UI components.
2.  **API Layer:** FastAPI with public endpoints.
3.  **Data Flow:**
    *   **Ingestion:** Blob Upload -> Azure Function Trigger -> Text Extraction -> Chunking -> Embedding -> Azure AI Search Index.
    *   **Chat:** User Query -> Embedding -> Vector Search (Azure Search) -> Contextual Prompt -> LLM (Azure OpenAI) -> Streaming Response.

## Building and Running

### Backend
1.  Navigate to `backend/`.
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # Mac/Linux
    venv\Scripts\activate     # Windows
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Configure `.env` (copy from `.env.example` if available, or see `app/core/config.py`).
5.  Run the server:
    ```bash
    uvicorn app.main:app --reload
    ```

### Frontend
1.  Navigate to `frontend/`.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

### Ingestion Function
1.  Navigate to `backend/ingestion_function/`.
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run locally using Azure Functions Core Tools:
    ```bash
    func start
    ```

## Development Conventions

*   **Authentication:** None. All routes are public.
*   **Configuration:** All settings are managed in `backend/app/core/config.py` using `pydantic-settings`.
*   **Models:** Use Pydantic models in `backend/app/models/` for request/response validation.
*   **Services:** Business logic and external integrations (OpenAI, Search, Blob) are encapsulated in `backend/app/services/`.
*   **Frontend State:** Managed using `zustand` (see `frontend/src/lib/store.ts`).
*   **Styling:** Tailwind CSS with Lucide icons.

## Key Files

*   `backend/app/main.py`: FastAPI entry point.
*   `backend/app/routes/chat.py`: Main RAG chat logic.
*   `backend/app/services/search_service.py`: Azure AI Search integration.
*   `backend/ingestion_function/function_app.py`: Blob-triggered ingestion logic.
*   `frontend/src/App.tsx`: Main React entry and routing logic.
