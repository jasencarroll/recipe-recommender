def test_recommend_endpoint(client):
    response = client.get("/api/recipes/recommend?time=30&complexity=10")
    assert response.status_code == 200
    data = response.json()
    assert "recipes" in data
    assert isinstance(data["recipes"], list)
    assert len(data["recipes"]) > 0
    recipe = data["recipes"][0]
    assert "name" in recipe
    assert "minutes" in recipe
    assert "complexity_score" in recipe
    assert "ingredients" in recipe
    assert "steps" in recipe


def test_recommend_with_custom_n(client):
    response = client.get("/api/recipes/recommend?time=30&complexity=10&n=2")
    assert response.status_code == 200
    data = response.json()
    assert len(data["recipes"]) <= 2


def test_recommend_missing_params(client):
    response = client.get("/api/recipes/recommend")
    assert response.status_code == 422


def test_search_endpoint(client):
    response = client.get("/api/recipes/search?q=chicken")
    assert response.status_code == 200
    data = response.json()
    assert "recipes" in data
    assert isinstance(data["recipes"], list)
    assert len(data["recipes"]) > 0
    assert "chicken" in data["recipes"][0]["name"].lower()


def test_search_no_results(client):
    response = client.get("/api/recipes/search?q=zzzznotfound")
    assert response.status_code == 200
    data = response.json()
    assert data["recipes"] == []


def test_search_missing_query(client):
    response = client.get("/api/recipes/search")
    assert response.status_code == 422


def test_stats_endpoint(client):
    response = client.get("/api/recipes/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total_recipes" in data
    assert "clusters" in data
    assert "avg_time" in data
    assert "avg_complexity" in data
    assert data["total_recipes"] == 3
    assert data["clusters"] == 3
