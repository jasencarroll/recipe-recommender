from unittest.mock import MagicMock, patch

import pandas as pd
import pytest
from fastapi.testclient import TestClient


@pytest.fixture()
def mock_recommender():
    """Create a mock RecipeRecommender with minimal test data."""
    recommender = MagicMock()
    recommender.data = pd.DataFrame(
        {
            "name": ["chicken soup", "pasta salad", "beef stew"],
            "minutes": [30, 15, 60],
            "complexity_score": [10.0, 5.0, 20.0],
            "ingredients": [
                "['chicken', 'water', 'salt']",
                "['pasta', 'mayo', 'celery']",
                "['beef', 'potato', 'carrot']",
            ],
            "steps": [
                "['boil water', 'add chicken', 'simmer']",
                "['cook pasta', 'mix ingredients']",
                "['brown beef', 'add vegetables', 'simmer for an hour']",
            ],
            "cluster": [0, 1, 2],
        }
    )
    recommender.scaler = MagicMock()
    recommender.scaler.transform.return_value = [[0.0, 0.0]]
    recommender.kmeans = MagicMock()
    recommender.kmeans.predict.return_value = [0]
    return recommender


@pytest.fixture()
def client(mock_recommender):
    """Create a test client with the mocked model."""
    with (
        patch("app.model._recommender", mock_recommender),
        patch("app.main.load_model", return_value=mock_recommender),
    ):
        from app.main import app

        with TestClient(app) as tc:
            yield tc
