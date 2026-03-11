from fastapi import APIRouter, Query

from ..model import get_stats, recommend_recipes, search_recipes

router = APIRouter(prefix="/api/recipes", tags=["recipes"])


@router.get("/recommend")
async def recommend(
    time: int = Query(..., ge=1, description="Desired cooking time in minutes"),
    complexity: int = Query(..., ge=1, description="Desired complexity score"),
    n: int = Query(5, ge=1, le=50, description="Number of recommendations"),
):
    recipes = recommend_recipes(desired_time=time, desired_complexity=complexity, n=n)
    return {"recipes": recipes}


@router.get("/search")
async def search(
    q: str = Query(..., min_length=1, description="Search query"),
    n: int = Query(10, ge=1, le=50, description="Number of results"),
):
    recipes = search_recipes(query=q, n=n)
    return {"recipes": recipes}


@router.get("/stats")
async def stats():
    return get_stats()
