from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    model_path: str = str(
        Path(__file__).resolve().parent.parent.parent
        / "food-recipe-recommender"
        / "models"
        / "recipe_recommender_model.joblib"
    )
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    model_config = {"env_prefix": "RECIPE_"}


settings = Settings()
