from openai import AzureOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

print("START EMBEDDING TEST")

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-02-01",
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
)

response = client.embeddings.create(
    model=os.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT"),
    input="Test embedding"
)

print("Embedding length:", len(response.data[0].embedding))
print("First values:", response.data[0].embedding[:5])