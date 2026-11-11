
from scoring import (
    score_amenity,
    score_price,
    score_distance,
    calculate_match_percentage,
    score_cafe,
    recommend_cafes,
)


# --------------------------------------------------
# 1. TEST INDIVIDUAL SCORING FUNCTIONS
# --------------------------------------------------

print("=== AMENITY SCORING ===")

print(score_amenity("required", True))     # 10
print(score_amenity("preferred", False))    # 0
print(score_amenity("required", False))     # None


print("\n=== PRICE SCORING ===")

print(score_price(1, 1))    # 20
print(score_price(1, 2))    # 15
print(score_price(1, 3))    # None
print(score_price(2, 1))    # 20


print("\n=== DISTANCE SCORING ===")

print(score_distance(1, 0.4))    # 20
print(score_distance(3, 1.5))    # 15
print(score_distance(5, 4.5))    # 10
print(score_distance(3, 4))      # None
print(score_distance(3, None))   # 0


print("\n=== MATCH PERCENTAGE ===")

print(calculate_match_percentage(70, 90))   # 77.78
print(calculate_match_percentage(80, 80))   # 100.0
print(calculate_match_percentage(0, 0))     # None


# --------------------------------------------------
# 2. SAMPLE USER PREFERENCES
# --------------------------------------------------

user = {
    "max_price_level": 2,
    "max_distance_km": 3,
    "preferred_food_category_id": 4,
    "amenities": {
        "wifi": "required",
        "quiet": "preferred",
        "laptop_friendly": "preferred",
        "outdoor_seating": "no_preference",
        "pet_friendly": "preferred",
    }
}


# --------------------------------------------------
# 3. SAMPLE CAFES
# --------------------------------------------------

cafes = [
    {
        "name": "Study Bean",
        "price_level": 2,
        "distance_km": 0.8,
        "amenities": {"wifi", "quiet"},
        "food_category_ids": {2, 4},
    },
    {
        "name": "Garden Brew",
        "price_level": 2,
        "distance_km": 1.5,
        "amenities": {
            "wifi",
            "quiet",
            "laptop_friendly",
            "outdoor_seating",
            "pet_friendly"
        },
        "food_category_ids": {1, 4},
    },
    {
        "name": "City Espresso",
        "price_level": 3,
        "distance_km": 2.5,
        "amenities": {"wifi", "laptop_friendly"},
        "food_category_ids": {3},
    },
    {
        "name": "Budget Coffee",
        "price_level": 1,
        "distance_km": 0.5,
        "amenities": {"quiet", "laptop_friendly"},
        "food_category_ids": {1},
    },
]


# --------------------------------------------------
# 4. TEST A SINGLE CAFE
# --------------------------------------------------

print("\n=== SINGLE CAFE MATCH ===")

cafe = cafes[0]

result = score_cafe(user, cafe)

print("Cafe:", cafe["name"])
print("Status:", result["status"])
print("Match:", result["match_percentage"], "%")


# --------------------------------------------------
# 5. PERSONALIZED RECOMMENDATIONS
# --------------------------------------------------

print("\n=== PERSONALIZED RECOMMENDATIONS ===")

results = recommend_cafes(user, cafes)

for cafe in results:
    print(f"{cafe['name']}: {cafe['match_percentage']}% match")


# --------------------------------------------------
# 6. GENERAL BROWSING WITHOUT PREFERENCES
# --------------------------------------------------

no_preferences = {
    "max_price_level": None,
    "max_distance_km": None,
    "preferred_food_category_id": None,
    "amenities": {
        "wifi": "no_preference",
        "quiet": "no_preference",
        "laptop_friendly": "no_preference",
        "outdoor_seating": "no_preference",
        "pet_friendly": "no_preference",
    }
}

print("\n=== GENERAL BROWSING ===")

general_results = recommend_cafes(no_preferences, cafes)

for cafe in general_results:
    print(cafe["name"], "-", cafe["match_percentage"])
