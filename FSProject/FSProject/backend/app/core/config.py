from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "AI Real Estate API"
    DEBUG: bool = False
    API_PREFIX: str = "/api"
    FRONTEND_URL: str = "http://localhost:3000"
    MONGODB_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "real_estate"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
