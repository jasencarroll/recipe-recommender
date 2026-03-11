import ast

import joblib
import numpy as np
import pandas as pd

from .config import settings

_recommender = None


def load_model():
    global _recommender
    _recommender = joblib.load(settings.model_path)
    return _recommender


def get_model():
    if _recommender is None:
        raise RuntimeError("Model not loaded")
    return _recommender


def recommend_recipes(
    desired_time: int, desired_complexity: int, n: int = 5
) -> list[dict]:
    model = get_model()
    user_input = pd.DataFrame(
        [[desired_time, desired_complexity]],
        columns=["minutes", "complexity_score"],
    )
    scaled = model.scaler.transform(user_input)
    cluster = model.kmeans.predict(scaled)[0]
    cluster_recipes = model.data[model.data["cluster"] == cluster].copy()
    cluster_recipes["distance"] = np.sqrt(
        (cluster_recipes["minutes"] - desired_time) ** 2
        + (cluster_recipes["complexity_score"] - desired_complexity) ** 2
    )
    top = cluster_recipes.nsmallest(n, "distance")
    return _format_recipes(top)


def search_recipes(query: str, n: int = 10) -> list[dict]:
    model = get_model()
    q = query.lower().strip()
    df = model.data.copy()
    df["score"] = 0
    name_match = df["name"].str.lower().str.contains(q, na=False)
    ingredient_match = df["ingredients"].str.lower().str.contains(q, na=False)
    df.loc[name_match, "score"] += 2
    df.loc[ingredient_match, "score"] += 1
    results = df[df["score"] > 0].nlargest(n, "score")
    return _format_recipes(results)


def get_stats() -> dict:
    model = get_model()
    df = model.data
    return {
        "total_recipes": len(df),
        "clusters": int(df["cluster"].nunique()),
        "avg_time": round(float(df["minutes"].mean()), 1),
        "avg_complexity": round(float(df["complexity_score"].mean()), 1),
    }


def _format_recipes(df: pd.DataFrame) -> list[dict]:
    recipes = []
    for _, row in df.iterrows():
        ingredients = (
            ast.literal_eval(row["ingredients"])
            if isinstance(row["ingredients"], str)
            else row["ingredients"]
        )
        steps = (
            ast.literal_eval(row["steps"])
            if isinstance(row["steps"], str)
            else row["steps"]
        )
        recipes.append(
            {
                "name": str(row["name"]).title(),
                "minutes": int(row["minutes"]),
                "complexity_score": float(row["complexity_score"]),
                "ingredients": [str(i).title() for i in ingredients],
                "steps": [str(s).capitalize() for s in steps],
            }
        )
    return recipes
