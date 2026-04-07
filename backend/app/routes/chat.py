from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json

from app.services.embedding_service import create_embedding
from app.services.search_service import search_documents
from app.services.openai_service import ask_llm_stream
from app.middleware.auth import get_current_user

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):
    """Handles chat requests by performing vector search and streaming the LLM response.
    Anonymous access enabled.
    """
    question = request.question
    tenant_id = "default"

    # Convert user query into a semantic vector embedding
    question_vector = await create_embedding(question)

    # Retrieve semantically relevant document chunks filtered by tenant_id
    documents, sources = search_documents(question_vector, question, tenant_id=tenant_id)

    # Aggregate retrieved chunks into a cohesive context block for the LLM
    context = "\n\n".join(documents)

    prompt = f"""
You are an HR assistant.

Use the HR policy documents below to answer the question.

Context:
{context}

Question:
{question}

If the answer is not in the documents, say you do not know.
"""

    async def stream():
        """Internal generator for streaming LLM tokens and appending metadata at the end."""
        # Yield LLM-generated tokens as they become available
        async for token in ask_llm_stream(prompt):
            yield token

        # Append source citations and grounding metadata at the end of the stream
        meta = {
            "sources": sources,
            "documents_used": len(documents)
        }

        yield f"\n\n__META__{json.dumps(meta)}"

    return StreamingResponse(
        stream(),
        media_type="text/plain"
    )