# recipe-recommender

Ingredient-based recipe recommendation engine built for the Quantic Data Science Foundations Capstone.

**Live Model:** [recipe-recommender.jasenc.dev](https://recipe-recommender.jasenc.dev/)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

## Features

- **Ingredient-Based Recommendations** — input what you have, get recipes back
- **ML Pipeline** — full preprocessing, feature engineering, and modeling workflow
- **Interactive Dashboard** — Streamlit app for exploring recommendations
- **Pre-trained Model** — bundled `.joblib` model and scaler for instant use

## Tech Stack

- **Language:** Python 3.11+
- **ML:** scikit-learn, NumPy, SciPy
- **Data:** Pandas, Matplotlib, Seaborn
- **Dashboard:** Streamlit
- **Dataset:** [Food.com Recipes and Interactions](https://www.kaggle.com/datasets/shuyangli94/food-com-recipes-and-user-interactions)

## Getting Started

### Prerequisites

- Python 3.11+
- pip

### Installation

```bash
git clone https://github.com/jasencarroll/recipe-recommender.git
cd recipe-recommender
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Get the Data

```bash
curl -L -o ~/Downloads/recipe-recommender-data.zip \
  https://www.kaggle.com/api/v1/datasets/download/shuyangli94/food-com-recipes-and-user-interactions
```

Unzip and move the extracted data into `food-recipe-recommender/data/`.

## Development

```bash
# Run the Streamlit dashboard (uses pre-trained model)
streamlit run food-recipe-recommender/app.py

# Rebuild the model from scratch
python food-recipe-recommender/main.py
```

## Project Structure

```
recipe-recommender/
├── food-recipe-recommender/
│   ├── data/                # Datasets (not in git)
│   ├── models/
│   │   ├── recipe_recommender_model.joblib
│   │   └── scaler.joblib
│   ├── src/
│   │   ├── __init__.py
│   │   ├── config.py        # Centralized configuration
│   │   ├── features.py      # Feature engineering
│   │   ├── modeling.py      # Model training and evaluation
│   │   ├── preprocessing.py # Data cleaning
│   │   ├── recommender.py   # Recommendation logic
│   │   └── validation_checks.py
│   ├── app.py               # Streamlit application
│   └── main.py              # Full model pipeline
├── railway.json
├── requirements.txt
└── LICENSE
```

## Deployment

### Railway

```bash
railway init
railway up
```

The `railway.json` config handles the build and start commands automatically.

## License

MIT License - see [LICENSE](LICENSE) for details.
