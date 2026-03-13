import os
from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv

load_dotenv()

search_client = SearchClient(
    endpoint=os.getenv("AZURE_SEARCH_ENDPOINT"),
    index_name=os.getenv("AZURE_SEARCH_INDEX"),
    credential=AzureKeyCredential(os.getenv("AZURE_SEARCH_KEY"))
)


# ------------------------------------------
# Upload vectors to Azure AI Search
# ------------------------------------------
def upload_documents(documents):

    result = search_client.upload_documents(documents)

    print(f"{len(documents)} documents uploaded to search index")

    return result