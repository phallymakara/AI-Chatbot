import os
from datetime import datetime
from dotenv import load_dotenv
from azure.storage.blob import BlobServiceClient

load_dotenv()

# ---------------------------------------------------
# Environment configuration
# ---------------------------------------------------
connection_string = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
container_name = os.getenv("AZURE_STORAGE_CONTAINER")

blob_service_client = BlobServiceClient.from_connection_string(connection_string)


# ---------------------------------------------------
# Upload file to Azure Blob Storage
# ---------------------------------------------------
def upload_file_to_blob(file, tenant_id):
    """
    Upload FastAPI UploadFile directly to Azure Blob Storage
    """

    blob_name = f"{tenant_id}/raw/{file.filename}"

    blob_client = blob_service_client.get_blob_client(
        container=container_name,
        blob=blob_name
    )

    blob_client.upload_blob(file.file, overwrite=True)

    return {
        "filename": file.filename,
        "blob_path": blob_name,
        "url": blob_client.url
    }


# ---------------------------------------------------
# List documents for a specific tenant
# ---------------------------------------------------
def list_documents(tenant_id):

    container_client = blob_service_client.get_container_client(container_name)

    blobs = container_client.list_blobs(
        name_starts_with=f"{tenant_id}/raw/"
    )

    documents = []

    for i, blob in enumerate(blobs, start=1):

        created_date = blob.creation_time

        if created_date:
            created_date = created_date.strftime("%Y-%m-%d")
        else:
            created_date = datetime.now().strftime("%Y-%m-%d")

        documents.append({
            "id": i,
            "name": blob.name.split("/")[-1],
            "path": blob.name,
            "date": created_date,
            "status": "Uploaded"
        })

    return documents


# ---------------------------------------------------
# Delete document from blob storage
# ---------------------------------------------------
def delete_document(filename, tenant_id):

    blob_name = f"{tenant_id}/raw/{filename}"

    blob_client = blob_service_client.get_blob_client(
        container=container_name,
        blob=blob_name
    )

    blob_client.delete_blob()

    return {
        "message": "document deleted successfully",
        "filename": filename
    }


# ---------------------------------------------------
# Get blob URL
# ---------------------------------------------------
def get_blob_url(filename, tenant_id):

    blob_name = f"{tenant_id}/raw/{filename}"

    blob_client = blob_service_client.get_blob_client(
        container=container_name,
        blob=blob_name
    )

    return blob_client.url