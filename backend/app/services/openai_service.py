from openai import AsyncAzureOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = AsyncAzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-12-01-preview",
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
)

DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME")


async def ask_llm_stream(prompt: str):
    """Sends a prompt to the LLM and yields the response as a stream of tokens.

    Args:
        prompt (str): The prompt to send to the LLM.

    Yields:
        str: The next token in the response stream.
    """
    stream = await client.chat.completions.create(
        model=DEPLOYMENT,
        stream=True,
        messages=[
            {
                "role": "system",
                "content": "You are an HR assistant. Answer questions based only on the provided HR policy documents."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
    )

    async for chunk in stream:
        if chunk.choices:
            delta = chunk.choices[0].delta
            if delta and delta.content:
                yield delta.content