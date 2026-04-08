from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json
import logging

from app.services.embedding_service import create_embedding
from app.services.search_service import search_documents
from app.services.openai_service import ask_llm_stream

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/chat")
async def chat(request: ChatRequest):
    """Handles chat requests by performing vector search and streaming the LLM response.
    Anonymous access enabled.
    """
    question = request.question
    tenant_id = "default" # Default tenant ID for anonymous access

    # Convert user query into a semantic vector embedding
    question_vector = await create_embedding(question)

    # Retrieve semantically relevant document chunks filtered by tenant_id
    documents, sources = search_documents(question_vector, question, tenant_id=tenant_id)

    logging.info(f"Retrieved {len(documents)} chunks from search index for query: '{question}'")

    # STRICT CHECK: If no documents were found in the index, do not call the LLM.
    if not documents:
        async def empty_stream():
            # Khmer detection (basic heuristic: check for Khmer characters)
            is_khmer = any('\u1780' <= char <= '\u17FF' for char in question)
            if is_khmer:
                yield "សូមអភ័យទោស ខ្ញុំមិនមានព័ត៌មានអំពីបញ្ហានេះនៅក្នុងឯកសារដែលមានស្រាប់នោះទេ។ សូមទាក់ទងផ្នែកគាំទ្រសម្រាប់ជំនួយបន្ថែម។"
            else:
                yield "I am sorry, but I do not have information about that in the available documents. Please contact support for further assistance."
            
            meta = {"sources": [], "documents_used": 0}
            yield f"\n\n__META__{json.dumps(meta)}"
        
        return StreamingResponse(empty_stream(), media_type="text/plain")

    # Aggregate retrieved chunks into a cohesive context block for the LLM
    context = "\n\n".join(documents)

    # Construct the user prompt with explicit grounding instructions
    user_prompt = f"""
I have provided snippets from our documents below. 
Answer the user's question using ONLY the provided context. 

If the answer is not contained within the context, respond in the language of the question (Khmer or English) stating that you do not have that information.
For example:
- English: "I am sorry, but I do not have information about that in the available documents. Please contact support for further assistance."
- Khmer: "សូមអភ័យទោស ខ្ញុំមិនមានព័ត៌មានអំពីបញ្ហានេះនៅក្នុងឯកសារដែលមានស្រាប់នោះទេ។ សូមទាក់ទងផ្នែកគាំទ្រសម្រាប់ជំនួយបន្ថែម។"

CONTEXT:
{context}

USER QUESTION:
{question}
"""

    async def stream():
        """Internal generator for streaming LLM tokens and appending metadata at the end."""
        # Yield LLM-generated tokens as they become available
        async for token in ask_llm_stream(user_prompt):
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
