import os
from dotenv import load_dotenv
from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential

load_dotenv()

endpoint = os.getenv("AZURE_SEARCH_ENDPOINT")
key = os.getenv("AZURE_SEARCH_KEY")
index_name = os.getenv("AZURE_SEARCH_INDEX")

credential = AzureKeyCredential(key)

search_client = SearchClient(
    endpoint=endpoint,
    index_name=index_name,
    credential=credential
)


# -----------------------------------------
# Upload documents to Azure AI Search
# -----------------------------------------
def upload_documents(documents):

    result = search_client.upload_documents(documents)
    return result


# -----------------------------------------
# Delete document chunks from search index
# -----------------------------------------
def delete_document_chunks(filename_prefix):

    results = search_client.search(
        search_text=filename_prefix,
        select=["id"]
    )

    ids = []

    for r in results:
        ids.append({"id": r["id"]})

    if ids:
        search_client.delete_documents(ids)

    return len(ids)


# -----------------------------------------
# Search relevant chunks
# -----------------------------------------
def search_documents(vector, query_text, top_k=3):

    results = search_client.search(
        search_text=None,  # vector search only
        vector_queries=[
            {
                "kind": "vector",
                "vector": vector,
                "fields": "embedding",
                "k": top_k
            }
        ],
        top=top_k,
        select=["content", "source", "page"]
    )

    documents = []
    sources = []
    seen_sources = set()

    for result in results:

        documents.append(result["content"])

        source = result["source"]
        page = result.get("page", 1)

        key = (source, page)

        if key not in seen_sources:
            seen_sources.add(key)

            sources.append({
                "document": source,
                "page": page
            })

    return documents, sources