import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sadugudu Studios API"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5432/sadugudustudios"
    )
    CORS_ORIGINS: list[str] = [
        "http://localhost",
        "http://localhost:8000",
        "http://localhost:3000",
        "http://localhost:5500",
        "http://127.0.0.1",
        "http://127.0.0.1:8000",
        "http://127.0.0.1:5500",
        "*"
    ]

    class Config:
        case_sensitive = True

settings = Settings()
