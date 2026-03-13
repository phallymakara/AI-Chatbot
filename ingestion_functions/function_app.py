# function_app.py

import logging
import os
import tempfile
import azure.functions as func

from ingestion.pipeline import extract_document_text
from ingestion.embed_pipeline import generate_embeddings
from services.search_service import upload_documents

app = func.FunctionApp()


@app.blob_trigger(
    arg_name="myblob",
    path="documents/{tenantId}/raw/{filename}",
    connection="AzureWebJobsStorage"
)
def blob_ingestion_trigger(myblob: func.InputStream):

    blob_path = myblob.name
    logging.info(f"Blob received: {blob_path}")

    # Extract tenant
    parts = blob_path.split("/")
    tenant_id = parts[1]
    filename = parts[-1]

    # Save blob temporarily
    temp_file = os.path.join(tempfile.gettempdir(), filename)

    with open(temp_file, "wb") as f:
        f.write(myblob.read())

    # Call parser
    chunks = extract_document_text(temp_file)

    # Call embedding pipeline
    embeddings = generate_embeddings(chunks)

    documents = []

    safe_filename = filename.replace(" ", "_").replace(".", "_")

    for i, item in enumerate(embeddings):

        documents.append({
            "id": f"{safe_filename}-{i}",
            "tenantId": tenant_id,
            "docId": safe_filename,
            "content": item["text"],
            "embedding": item["embedding"],
            "page": item["page"],
            "source": blob_path
        })

    # Call vector storage
    upload_documents(documents)

    logging.info("Document indexed successfully")