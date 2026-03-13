import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_version="2024-02-01"
)

deployment_name = os.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT")


# ------------------------------------------
# Generate embeddings
# ------------------------------------------
def generate_embeddings(chunks):

    results = []

    for item in chunks:

        text = item["text"]

        try:

            response = client.embeddings.create(
                model=deployment_name,
                input=text
            )

            embedding = response.data[0].embedding

            results.append({
                "text": text,
                "embedding": embedding,
                "page": item["page"]
            })

        except Exception as e:

            print(f"Embedding failed: {e}")

    return results