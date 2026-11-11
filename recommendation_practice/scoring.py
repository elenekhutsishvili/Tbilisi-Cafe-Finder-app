
# TCF-65: Cafe Recommendation Scoring Algorithm
# Tbilisi Cafe Finder

from math import radians, sin, cos, sqrt, atan2
from explanations import explain_recommendation

def score_amenity(selection, cafe_has_amenity):
    """
    Calculate points for one amenity.
    Required amenities exclude cafes when missing.
    """
    if selection == "required":
        if cafe_has_amenity:
            return 10
        return None

    if selection == "preferred":
        if cafe_has_amenity:
            return 10
        return 0

    if selection == "no_preference":
        return 0

    raise ValueError("Invalid amenity preference")


def score_price(max_price_level, cafe_price_level):
    """
    Calculate price score (maximum 20 points).
    Price levels: 1 = $, 2 = $$, 3 = $$$.
    """
    if max_price_level is None:
        return 0

    # At or below the preferred maximum
    if cafe_price_level <= max_price_level:
        return 20

    # One price level above
    if cafe_price_level == max_price_level + 1:
        return 15

    # Two price levels above: excluded
    return None


def score_distance(max_distance_km, cafe_distance_km):
    """
    Calculate distance score (maximum 20 points).
    Allowed maximum distances: 1, 3, or 5 km.
    """
    if max_distance_km is None or cafe_distance_km is None:
        return 0

    # Exclude cafes beyond the maximum distance
    if cafe_distance_km > max_distance_km:
        return None

    if max_distance_km == 1:
        if cafe_distance_km <= 0.5:
            return 20
        return 15

    if max_distance_km == 3:
        if cafe_distance_km <= 1:
            return 20
        if cafe_distance_km <= 2:
            return 15
        return 10

    if max_distance_km == 5:
        if cafe_distance_km <= 2:
            return 20
        if cafe_distance_km <= 4:
            return 15
        return 10

    raise ValueError("Unsupported maximum distance")


def calculate_match_percentage(points_earned, maximum_points):
    """
    Convert earned points into a percentage.
    Return None when no scoring criteria are applicable.
    """
    if maximum_points == 0:
        return None

    return round((points_earned / maximum_points) * 100, 2)


def score_cafe(user_preferences, cafe):
    """
    Calculate a cafe's personalized recommendation result.

    Possible statuses:
    - scored: eligible cafe with a match percentage
    - excluded: cafe fails a mandatory requirement
    - unscored: eligible cafe with no applicable criteria
    """
    points_earned = 0
    maximum_points = 0

    # 1. PRICE (20 points)
    max_price = user_preferences["max_price_level"]

    if max_price is not None:
        price_points = score_price(
            max_price,
            cafe["price_level"]
        )

        if price_points is None:
            return {
                "status": "excluded",
                "match_percentage": None
            }

        points_earned += price_points
        maximum_points += 20

    # 2. DISTANCE (20 points)
    max_distance = user_preferences["max_distance_km"]
    cafe_distance = cafe["distance_km"]

    if max_distance is not None and cafe_distance is not None:
        distance_points = score_distance(
            max_distance,
            cafe_distance
        )

        if distance_points is None:
            return {
                "status": "excluded",
                "match_percentage": None
            }

        points_earned += distance_points
        maximum_points += 20

    # 3. AMENITIES (10 points each)
    for amenity, selection in user_preferences["amenities"].items():

        # Ignore amenities the user does not care about
        if selection == "no_preference":
            continue

        cafe_has_amenity = amenity in cafe["amenities"]

        amenity_points = score_amenity(
            selection,
            cafe_has_amenity
        )

        if amenity_points is None:
            return {
                "status": "excluded",
                "match_percentage": None
            }

        points_earned += amenity_points
        maximum_points += 10

    # 4. FOOD CATEGORY (10 points)
    preferred_food = user_preferences["preferred_food_category_id"]

    if preferred_food is not None:
        maximum_points += 10

        if preferred_food in cafe["food_category_ids"]:
            points_earned += 10

    # 5. HANDLE USERS WITHOUT APPLICABLE PREFERENCES
    if maximum_points == 0:
        return {
            "status": "unscored",
            "match_percentage": None
        }

    # 6. RETURN PERSONALIZED MATCH RESULT
    return {
        "status": "scored",
        "match_percentage": calculate_match_percentage(
            points_earned,
            maximum_points
        )
    }


def recommend_cafes(user_preferences, cafes):
    """
    Recommend eligible cafes ranked by match percentage.

    Excluded and inactive cafes are not shown.
    Cafes without a score appear after scored cafes.
    """
    recommendations = []

    for cafe in cafes:

        # Skip inactive cafes
        if not cafe.get("is_active", True):
            continue

        # Calculate the cafe's result
        result = score_cafe(user_preferences, cafe)

        # Skip excluded cafes
        if result["status"] == "excluded":
            continue

        
        recommendations.append({
            "name": cafe["name"],
            "match_percentage": result["match_percentage"],
            "explanations": (
                explain_recommendation(user_preferences, cafe)
                if result["status"] == "scored"
                else []
            )
        })


    # Highest scores first; unscored cafes last
    recommendations.sort(
        key=lambda cafe: (
            cafe["match_percentage"] is not None,
            cafe["match_percentage"]
            if cafe["match_percentage"] is not None
            else -1
        ),
        reverse=True
    )

    return recommendations

def calculate_distance(user_lat, user_lon, cafe_lat, cafe_lon):
    """
    Calculate the straight-line distance between
    a user and a cafe using GPS coordinates.

    Returns distance in kilometers.
    """
    earth_radius_km = 6371.0

    # Convert coordinates from degrees to radians
    lat1 = radians(user_lat)
    lon1 = radians(user_lon)
    lat2 = radians(cafe_lat)
    lon2 = radians(cafe_lon)

    # Differences between coordinates
    lat_difference = lat2 - lat1
    lon_difference = lon2 - lon1

    # Haversine formula
    a = (
        sin(lat_difference / 2) ** 2
        + cos(lat1) * cos(lat2)
        * sin(lon_difference / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return earth_radius_km * c
