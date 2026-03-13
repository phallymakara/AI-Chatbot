import os

from app.ingestion.pdf_parser import parse_pdf
from app.ingestion.docx_parser import parse_docx
from app.ingestion.chunker import chunk_text


def extract_document_text(file_path: str):

    extension = os.path.splitext(file_path)[1].lower()

    documents = []

    # -------- PDF --------
    if extension == ".pdf":

        pages = parse_pdf(file_path)

        for page in pages:

            page_number = page["page"]
            text = page["text"]

            chunks = chunk_text(text)

            for chunk in chunks:
                documents.append({
                    "text": chunk,
                    "page": page_number
                })

    # -------- DOCX --------
    elif extension == ".docx":

        text = parse_docx(file_path)

        chunks = chunk_text(text)

        for chunk in chunks:
            documents.append({
                "text": chunk,
                "page": 1   # DOCX has no real page concept
            })

    else:
        raise ValueError("Unsupported file format")

    return documents