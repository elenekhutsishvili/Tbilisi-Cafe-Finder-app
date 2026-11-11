
def explain_recommendation(user_preferences, cafe):
    explanations = []

    # Price preference
    max_price = user_preferences["max_price_level"]

    if max_price is not None:
        if cafe["price_level"] <= max_price:
            explanations.append("Matches your preferred price range")

    # Distance preference
    max_distance = user_preferences["max_distance_km"]
    cafe_distance = cafe["distance_km"]

    if max_distance is not None and cafe_distance is not None:
        if cafe_distance <= max_distance:
            explanations.append("Within your preferred distance")

    # Amenity preferences
    amenity_labels = {
        "wifi": "Wi-Fi",
        "quiet": "a quiet atmosphere",
        "laptop_friendly": "laptop-friendly seating",
        "outdoor_seating": "outdoor seating",
        "pet_friendly": "pet-friendly facilities"
    }

    for amenity, selection in user_preferences["amenities"].items():
        if selection in ("required", "preferred"):
            if amenity in cafe["amenities"]:
                label = amenity_labels.get(amenity, amenity)
                explanations.append(f"Offers {label}")

    # Food preference
    preferred_food = user_preferences["preferred_food_category_id"]

    if preferred_food is not None:
        if preferred_food in cafe["food_category_ids"]:
            explanations.append("Matches your preferred food category")

    return explanations


if __name__ == "__main__":
    sample_user = {
        "max_price_level": 2,
        "max_distance_km": 3,
        "preferred_food_category_id": 4,
        "amenities": {
            "wifi": "required",
            "quiet": "preferred",
            "laptop_friendly": "preferred",
            "outdoor_seating": "no_preference",
            "pet_friendly": "preferred"
        }
    }

    sample_cafe = {
        "name": "Study Bean",
        "price_level": 2,
        "distance_km": 0.8,
        "amenities": {"wifi", "quiet"},
        "food_category_ids": {2, 4}
    }

    for explanation in explain_recommendation(sample_user, sample_cafe):
        print(explanation)
