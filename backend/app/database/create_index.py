import os
from dotenv import load_dotenv

from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import (
    SearchIndex,
    SimpleField,
    SearchableField,
    SearchField,
    SearchFieldDataType,
    VectorSearch,
    HnswAlgorithmConfiguration,
    VectorSearchProfile
)

from azure.core.credentials import AzureKeyCredential

load_dotenv()

endpoint = os.getenv("AZURE_SEARCH_ENDPOINT")
key = os.getenv("AZURE_SEARCH_KEY")
index_name = os.getenv("AZURE_SEARCH_INDEX")

credential = AzureKeyCredential(key)

index_client = SearchIndexClient(endpoint, credential)


fields = [
    SimpleField(name="id", type=SearchFieldDataType.String, key=True),

    SearchableField(
        name="content",
        type=SearchFieldDataType.String
    ),

    SearchField(
        name="embedding",
        type=SearchFieldDataType.Collection(SearchFieldDataType.Single),
        vector_search_dimensions=3072,
        vector_search_profile_name="vector-profile"
    ),

    SimpleField(
        name="source",
        type=SearchFieldDataType.String,
        filterable=True
    ),

    SimpleField(
        name="page",
        type=SearchFieldDataType.Int32,
        filterable=True
    ),
]


vector_search = VectorSearch(
    algorithms=[
        HnswAlgorithmConfiguration(
            name="hnsw-config"
        )
    ],
    profiles=[
        VectorSearchProfile(
            name="vector-profile",
            algorithm_configuration_name="hnsw-config"
        )
    ]
)


index = SearchIndex(
    name=index_name,
    fields=fields,
    vector_search=vector_search
)

index_client.create_or_update_index(index)

print(f"Index '{index_name}' created successfully")