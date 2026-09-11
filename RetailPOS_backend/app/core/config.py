# pyrefly: ignore [missing-import]
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "RetailPOS API"
    APP_VERSION: str = "1.0.0"
    
    # SQL Server configuration
    DB_SERVER: str = "localhost"
    DB_NAME: str = "RTGW"
    DB_DRIVER: str = "ODBC Driver 17 for SQL Server"
    DB_TRUSTED_CONNECTION: bool = True
    
    # For SQL Auth (if you use it instead of Trusted Connection)
    DB_USER: str = ""
    DB_PASSWORD: str = ""
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]
    
    @property
    def database_url(self) -> str:
        if self.DB_TRUSTED_CONNECTION:
            return (
                f"mssql+pyodbc://{self.DB_SERVER}/{self.DB_NAME}"
                f"?driver={self.DB_DRIVER.replace(' ', '+')}"
                f"&trusted_connection=yes"
            )
        return (
            f"mssql+pyodbc://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_SERVER}/{self.DB_NAME}"
            f"?driver={self.DB_DRIVER.replace(' ', '+')}"
        )
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()