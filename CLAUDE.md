# Recipe Recommender

Recipe recommendation system using the Food.com dataset and K-means clustering, served as a full-stack web app.

## Build & Development

### Backend (Python / FastAPI)
```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload --port 8000
uv run pytest -v
uv run ruff check .
uv run ruff format .
```

### Frontend (React / Vite)
```bash
cd frontend
bun install
bun run dev          # Dev server on :5173, proxies /api to :8000
bun run build
bun run lint
```

## Architecture

- **Backend**: FastAPI + scikit-learn + joblib
- **Frontend**: React 19 + Vite + Tailwind v4 + shadcn/ui
- **Model**: K-means clustering (k=6) on cook time and complexity score
- **API**: All endpoints under `/api/`

## Key Directories

```
backend/
  app/main.py          # FastAPI app, CORS, static serving
  app/model.py         # Model loading and inference
  app/config.py        # Settings
  app/routes/recipes.py  # Recommendation and search endpoints
  app/routes/health.py   # Health check
  tests/

frontend/
  src/App.tsx
  src/pages/Home.tsx         # Main page
  src/components/            # RecipeCard, RecommendForm, SearchBar

food-recipe-recommender/
  src/                       # Source modules (preprocessing, features, modeling, recommender)
  models/                    # Serialized model artifacts (joblib) -- used by the backend
  data/                      # Raw CSV datasets (not in Git)
```

## Domain

- Loads a pre-trained `RecipeRecommender` from `food-recipe-recommender/models/recipe_recommender_model.joblib`
- `RecipeRecommender` wraps a `StandardScaler` and `KMeans` model, scales user input, predicts the nearest cluster, then ranks recipes by Euclidean distance
- Features: `minutes` (cook time) and `complexity_score` (n_steps * n_ingredients)
- Search does string matching on recipe name and ingredients columns
