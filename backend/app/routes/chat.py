from fastapi import APIRouter
from pydantic import BaseModel

from app.services.embedding_service import create_embedding
from app.services.search_service import search_documents
from app.services.openai_service import ask_llm

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):

    question = request.question

    # Step 1 — Generate embedding for user question
    question_vector = create_embedding(question)

    # Step 2 — Search relevant documents in Azure AI Search
    documents, sources = search_documents(question_vector, question)

    # Step 3 — Build context from retrieved chunks
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

    # Step 4 — Ask GPT
    answer = ask_llm(prompt)

    return {
        "question": question,
        "answer": answer,
        "sources": sources,
        "documents_used": len(documents)
    }