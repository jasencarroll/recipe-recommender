# Recipe Recommender

A full-stack recipe recommendation engine powered by K-means clustering on 41,932 Food.com recipes.

**Live Demo:** [recipe-recommender.jasencarroll.com](https://recipe-recommender.jasencarroll.com)

## Features

- **ML-Powered Recommendations** -- input preferred cook time and complexity, get matched recipes from the nearest cluster
- **Recipe Search** -- find recipes by name or ingredients with string matching
- **Cluster Insights** -- view per-cluster statistics (average cook time, complexity, recipe count)
- **Pre-trained Model** -- serialized K-means model and scaler loaded at startup via joblib for instant inference

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, shadcn/ui |
| **Backend** | FastAPI, Uvicorn |
| **ML** | scikit-learn, NumPy, Pandas, joblib |
| **Dataset** | [Food.com Recipes and Interactions](https://www.kaggle.com/datasets/shuyangli94/food-com-recipes-and-user-interactions) (200K+ raw, 41,932 after processing) |
| **Tooling** | uv, Ruff, Bun, Biome |
| **CI/CD** | GitHub Actions (lint + test + build), Docker, Railway |

## How the ML Works

The recommendation engine uses **K-means clustering (k=6)** trained on two engineered features:

- **`minutes`** -- recipe cook time
- **`complexity_score`** -- `n_steps * n_ingredients`, a single metric capturing how involved a recipe is

**Why K-means?** Recipes naturally group into meaningful clusters along these two axes (quick-and-simple weeknight meals, elaborate multi-hour dishes, etc.). K-means finds those groupings without labeled data, and at inference time the model simply scales the user's input, predicts the nearest cluster, then ranks recipes within that cluster by Euclidean distance -- fast enough for real-time API responses.

The full pipeline (preprocessing, feature engineering, training, evaluation) lives in `food-recipe-recommender/src/`. The production backend loads only the serialized model artifacts, keeping startup lightweight.

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+ or Bun
- [uv](https://docs.astral.sh/uv/)

### Backend

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
bun install
bun run dev          # Dev server on :5173, proxies /api to :8000
```

### Linting and Tests

```bash
# Backend
uv run ruff check .
uv run ruff format .
uv run pytest -v

# Frontend
bun run lint
bun run build
```

### Rebuild the Model (optional)

Download the dataset from Kaggle, place the CSVs in `food-recipe-recommender/data/`, then:

```bash
cd food-recipe-recommender
python main.py
```

## Project Structure

```
recipe_recommender/
├── backend/
│   └── app/
│       ├── main.py              # FastAPI app, CORS, static file serving
│       ├── model.py             # Model loading and inference
│       ├── config.py            # Settings
│       └── routes/
│           ├── recipes.py       # Recommendation and search endpoints
│           └── health.py        # Health check
├── frontend/
│   └── src/
│       ├── App.tsx
│       ├── pages/Home.tsx       # Main page
│       └── components/
│           ├── RecommendForm.tsx # Cook time + complexity input form
│           ├── SearchBar.tsx     # Name and ingredient search
│           ├── RecipeCard.tsx    # Recipe result display
│           └── ui/              # shadcn/ui primitives
├── food-recipe-recommender/
│   ├── models/
│   │   ├── recipe_recommender_model.joblib
│   │   └── scaler.joblib
│   └── src/
│       ├── preprocessing.py     # Data cleaning
│       ├── features.py          # Feature engineering
│       ├── modeling.py          # Model training and evaluation
│       ├── recommender.py       # Recommendation logic
│       └── config.py            # Pipeline configuration
├── Dockerfile
├── railway.json
└── pyproject.toml
```

## Deployment

The app ships as a multi-stage Docker image (Bun for the frontend build, uv for the backend) and deploys to Railway. The `railway.json` config points at the Dockerfile and sets `/api/health` as the health check path.

## License

MIT License -- see [LICENSE](LICENSE) for details.
