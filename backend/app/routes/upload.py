from fastapi import APIRouter, UploadFile, File, Depends
from app.services.blob_service import upload_file_to_blob
from app.services.blob_service import delete_document
from app.services.blob_service import list_documents
from app.services.search_service import delete_document_chunks
from app.auth.auth_service import verify_token

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


# --------------------------------------------------
# Upload Document
# --------------------------------------------------
@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    token_payload=Depends(verify_token)
):

    tenant_id = get_tenant_id(token_payload)

    result = upload_file_to_blob(file, tenant_id)

    return {
        "message": "uploaded successfully",
        "tenant": tenant_id,
        "blob_url": result["url"]
    }


# --------------------------------------------------
# List Documents
# --------------------------------------------------
@router.get("")
async def get_documents():

    tenant_id = "tenantA"

    documents = list_documents(tenant_id)

    return {
        "documents": documents
    }


# --------------------------------------------------
# Delete Document
# --------------------------------------------------
@router.delete("/{filename}")
async def remove_document(filename: str):

    tenant_id = "tenantA"

    # delete blob file
    delete_document(filename, tenant_id)

    # delete vectors from AI Search
    safe_filename = filename.replace(" ", "_").replace(".", "_")
    deleted_chunks = delete_document_chunks(safe_filename)

    return {
        "message": "document removed",
        "filename": filename,
        "chunks_deleted": deleted_chunks
    }