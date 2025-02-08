from src.preprocessing import load_data, summary_data, preprocess_data, plot_prep_time_vs_ingredients, plot_most_used_ingredients
from src.feature_selection import select_features
from src.feature_engineering import encode_ingredients, normalize_numerical_features, sanity_check
from src.modeling import RecipeRecommender  # Import the KNN-based recommendation system

def main():
    # Load the dataset
    recipes, interactions = load_data()

    # Summarize data for an initial understanding
    summary_data(recipes, interactions)

    # Preprocess the dataset
    recipes_cleaned, interactions_cleaned = preprocess_data(recipes, interactions)

    # Visualize Preparation Time vs Number of Ingredients
    plot_prep_time_vs_ingredients(recipes_cleaned)

    # Visualize Most Used Ingredients
    plot_most_used_ingredients(recipes_cleaned)

    # Feature selection
    selected_features = select_features(recipes_cleaned, interactions_cleaned)

    # Print the first few rows to verify
    print("Selected Features Sample:")
    print(selected_features.head())

    # Feature Engineering

    # Encode ingredients
    ingredient_matrix, vectorizer = encode_ingredients(selected_features)

    # Normalize numerical features
    normalized_features, scaler = normalize_numerical_features(selected_features)

    # Print the first few rows to verify
    print("Encoded Ingredients Matrix Sample:")
    print(ingredient_matrix[:5])

    print("Normalized Features Sample:")
    print(normalized_features[:5])

    # Sanity check
    sanity_check(selected_features, ingredient_matrix, normalized_features)

    ### 🔹 Integrating KNN-Based Recommendation System ###
    
    # Initialize the Recipe Recommender
    recommender = RecipeRecommender(selected_features, k=5)  # k=5: Number of recommendations to make

    # Ask for user input (simulating with predefined values)
    desired_time = 30  # Example: User wants a 30-minute recipe
    desired_complexity = 50  # Example: User wants a medium complexity recipe

    # Get recipe recommendations
    recommendations = recommender.recommend_recipes(desired_time, desired_complexity)

    # Display recommendations
    print("\nRecommended Recipes:")
    print(recommendations[['minutes', 'complexity_score', 'similarity_distance']])
    
if __name__ == "__main__":
    main()
