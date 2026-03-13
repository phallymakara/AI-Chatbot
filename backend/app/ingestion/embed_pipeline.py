from app.services.embedding_service import create_embedding


def generate_embeddings(chunks):

    results = []

    for item in chunks:

        embedding = create_embedding(item["text"])

        results.append({
            "text": item["text"],
            "embedding": embedding,
            "page": item["page"]
        })

    return results