# Stage 1: Build frontend
FROM oven/bun:latest AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/bun.lockb* ./
RUN bun install
COPY frontend/ .
RUN bun run build

# Stage 2: Production
FROM ghcr.io/astral-sh/uv:python3.11-bookworm-slim AS production
WORKDIR /app

COPY backend/pyproject.toml backend/uv.lock* ./backend/
RUN cd backend && uv sync --no-dev

COPY backend/ ./backend/
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Copy trained ML model files
COPY food-recipe-recommender/models/ ./models/

ENV RECIPE_MODEL_PATH=/app/models/recipe_recommender_model.joblib

CMD sh -c "uv run --directory backend uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"
