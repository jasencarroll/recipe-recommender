import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .config import settings
from .model import load_model
from .routes.health import router as health_router
from .routes.recipes import router as recipes_router

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Loading recommendation model from %s", settings.model_path)
    load_model()
    logger.info("Model loaded successfully")
    yield


app = FastAPI(
    title="Recipe Recommender API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(recipes_router)

# Serve frontend static files in production with SPA catch-all
frontend_dist = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
if frontend_dist.is_dir():
    app.mount("/assets", StaticFiles(directory=frontend_dist / "assets"), name="static")

    @app.get("/{path:path}")
    async def serve_spa(path: str) -> FileResponse:
        file = frontend_dist / path
        if file.exists() and file.is_file():
            return FileResponse(file)
        return FileResponse(frontend_dist / "index.html")
