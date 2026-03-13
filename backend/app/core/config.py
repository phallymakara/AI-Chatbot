from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    AZURE_OPENAI_ENDPOINT: str
    AZURE_OPENAI_API_KEY: str
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT: str

    AZURE_SEARCH_ENDPOINT: str
    AZURE_SEARCH_KEY: str
    AZURE_SEARCH_INDEX: str

    AZURE_STORAGE_CONNECTION_STRING: str
    AZURE_STORAGE_CONTAINER: str

    class Config:
        env_file = ".env"


settings = Settings()