from typing import Optional, Dict, Any
from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str
    SCHEME_DATABASE: str
    DATABASE_NAME: str
    SQLALCHEMY_DATABASE_URI: Optional[str] = None

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return values.get("SCHEME_DATABASE") + values.get("DATABASE_NAME")

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
