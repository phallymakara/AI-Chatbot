import os
from pypdf import PdfReader


# ------------------------------------------
# Extract text from document
# ------------------------------------------
def extract_document_text(file_path):

    chunks = []

    file_ext = os.path.splitext(file_path)[1].lower()

    if file_ext == ".pdf":

        reader = PdfReader(file_path)

        for page_num, page in enumerate(reader.pages):

            text = page.extract_text()

            if not text:
                continue

            page_chunks = split_text(text)

            for chunk in page_chunks:

                chunks.append({
                    "text": chunk,
                    "page": page_num + 1
                })

    return chunks


# ------------------------------------------
# Split text into chunks
# ------------------------------------------
def split_text(text, chunk_size=500):

    words = text.split()

    chunks = []

    for i in range(0, len(words), chunk_size):

        chunk = " ".join(words[i:i + chunk_size])

        chunks.append(chunk)

    return chunks