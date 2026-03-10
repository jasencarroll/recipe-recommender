# Recipe Recommender

## Overview

A recipe recommendation system built with Streamlit using the Food.com Recipes and Interactions dataset. The system uses K-means clustering to group recipes by cooking time and complexity score, then recommends recipes from the nearest cluster to user preferences. Users can also search recipes by name or ingredient.

## Build / Run Commands

```bash
uv sync                                          # Install all dependencies
uv run streamlit run food-recipe-recommender/app.py  # Run the Streamlit app
uv run ruff check .                              # Lint
uv run ruff format .                             # Format
uv run pytest                                    # Run tests
```

## Key Files and Directories

- `food-recipe-recommender/app.py` -- Streamlit web application entry point
- `food-recipe-recommender/main.py` -- Model training pipeline (data loading, EDA, feature engineering, clustering)
- `food-recipe-recommender/src/` -- Source modules
  - `config.py` -- Centralized path constants for data and model files
  - `preprocessing.py` -- Data loading, cleaning, and EDA visualizations
  - `features.py` -- Feature engineering and selection (avg_rating, complexity_score)
  - `modeling.py` -- K-means clustering: elbow method, silhouette scoring, train/test split
  - `recommender.py` -- `RecipeRecommender` class: trains K-means, recommends and searches recipes
  - `validation_checks.py` -- Input validation, schema checks, data leakage detection
- `food-recipe-recommender/models/` -- Serialized model artifacts (joblib)
- `food-recipe-recommender/data/` -- Raw CSV datasets (not in Git)
- `requirements.txt` -- Legacy pinned dependencies (kept for reference)
- `pyproject.toml` -- Modern project configuration with uv
- `railway.json` -- Railway deployment config

## Architecture Notes

- The app loads a pre-trained `RecipeRecommender` object from `models/recipe_recommender_model.joblib` using joblib.
- `RecipeRecommender` wraps a `StandardScaler` and `KMeans` (k=6) model. It scales user input (desired cook time and complexity), predicts the nearest cluster, then ranks cluster recipes by Euclidean distance.
- Features used for clustering: `minutes` (cook time) and `complexity_score` (n_steps * n_ingredients).
- The training pipeline in `main.py` is mostly commented out; the checked-in model artifacts are the production weights.
- Search functionality does string matching on recipe name and ingredients columns.
