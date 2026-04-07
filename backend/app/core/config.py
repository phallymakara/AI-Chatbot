from pydantic_settings import BaseSettings


class Settings(BaseSettings):

<<<<<<< HEAD
    # 🔐 Azure OpenAI
=======
    # Azure OpenAI
>>>>>>> origin/main
    AZURE_OPENAI_ENDPOINT: str
    AZURE_OPENAI_API_KEY: str
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT: str

<<<<<<< HEAD
    # 🔎 Azure AI Search
=======
    # Azure AI Search
>>>>>>> origin/main
    AZURE_SEARCH_ENDPOINT: str
    AZURE_SEARCH_KEY: str
    AZURE_SEARCH_INDEX: str

<<<<<<< HEAD
    # 📦 Azure Storage
    AZURE_STORAGE_CONNECTION_STRING: str
    AZURE_STORAGE_CONTAINER: str

    # 🧱 Azure SQL Database (NEW)
=======
    # Azure Storage
    AZURE_STORAGE_CONNECTION_STRING: str
    AZURE_STORAGE_CONTAINER: str

    # Azure SQL Database (NEW)
>>>>>>> origin/main
    DB_SERVER: str
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str

<<<<<<< HEAD
    # ⚙️ Optional (recommended)
=======
    # Optional (recommended)
>>>>>>> origin/main
    DB_DRIVER: str = "ODBC Driver 18 for SQL Server"

    class Config:
        env_file = ".env"
        extra = "ignore"   # ignore unused env vars


settings = Settings()