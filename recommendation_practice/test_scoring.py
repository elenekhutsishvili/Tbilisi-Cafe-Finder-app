
import unittest

from scoring import (
    score_amenity,
    score_price,
    score_distance,
    calculate_match_percentage,
    score_cafe,
    recommend_cafes,
)


class TestScoring(unittest.TestCase):

    def test_required_amenity_missing(self):
        result = score_amenity("required", False)
        self.assertIsNone(result)

    def test_preferred_amenity_missing(self):
        result = score_amenity("preferred", False)
        self.assertEqual(result, 0)

    def test_price_exclusion(self):
        result = score_price(1, 3)
        self.assertIsNone(result)

    def test_distance_exclusion(self):
        result = score_distance(3, 4)
        self.assertIsNone(result)

    def test_match_percentage(self):
        result = calculate_match_percentage(70, 90)
        self.assertEqual(result, 77.78)

    def test_no_applicable_preferences(self):
        result = calculate_match_percentage(0, 0)
        self.assertIsNone(result)


    def test_cafe_excluded_when_required_wifi_missing(self):
        user = {
            "max_price_level": None,
            "max_distance_km": None,
            "preferred_food_category_id": None,
            "amenities": {"wifi": "required"}
        }

        cafe = {
            "name": "No Wi-Fi Cafe",
            "price_level": 1,
            "distance_km": 1,
            "amenities": set(),
            "food_category_ids": set()
        }
        result = score_cafe(user, cafe)
        self.assertEqual(result["status"], "excluded")
        self.assertIsNone(result["match_percentage"])

    def test_cafes_ranked_highest_first(self):
        user = {
            "max_price_level": None,
            "max_distance_km": None,
            "preferred_food_category_id": None,
            "amenities": {"wifi": "preferred"}
        }

        cafes = [
            {
                "name": "Cafe A",
                "price_level": 1,
                "distance_km": 1,
                "amenities": set(),
                "food_category_ids": set()
            },
            {
                "name": "Cafe B",
                "price_level": 1,
                "distance_km": 1,
                "amenities": {"wifi"},
                "food_category_ids": set()
            }
        ]

        results = recommend_cafes(user, cafes)

        self.assertEqual(results[0]["name"], "Cafe B")
        self.assertEqual(results[0]["match_percentage"], 100.0)
        self.assertEqual(results[1]["name"], "Cafe A")

    def test_general_browsing_without_preferences(self):
        user = {
            "max_price_level": None,
            "max_distance_km": None,
            "preferred_food_category_id": None,
            "amenities": {"wifi": "no_preference"}
        }

        cafes = [
            {
                "name": "Cafe A",
                "price_level": 1,
                "distance_km": None,
                "amenities": set(),
                "food_category_ids": set()
            }
        ]

        results = recommend_cafes(user, cafes)

        self.assertEqual(len(results), 1)
        self.assertIsNone(results[0]["match_percentage"])

    def test_inactive_cafe_not_recommended(self):
        user = {
            "max_price_level": None,
            "max_distance_km": None,
            "preferred_food_category_id": None,
            "amenities": {"wifi": "preferred"}
        }

        cafes = [
            {
                "name": "Closed Cafe",
                "price_level": 1,
                "distance_km": 1,
                "amenities": {"wifi"},
                "food_category_ids": set(),
                "is_active": False
            }
        ]

        results = recommend_cafes(user, cafes)

        self.assertEqual(len(results), 0)

    def test_distance_only_without_location(self):
        user = {
            "max_price_level": None,
            "max_distance_km": 3,
            "preferred_food_category_id": None,
            "amenities": {
                "wifi": "no_preference",
                "quiet": "no_preference",
                "laptop_friendly": "no_preference",
                "outdoor_seating": "no_preference",
                "pet_friendly": "no_preference"
            }
        }

        cafes = [
            {
                "name": "Cafe A",
                "price_level": 2,
                "distance_km": None,
                "amenities": set(),
                "food_category_ids": set()
            }
        ]

        results = recommend_cafes(user, cafes)

        self.assertEqual(len(results), 1)
        self.assertIsNone(results[0]["match_percentage"])

    def test_mixed_distance_availability(self):
        user = {
            "max_price_level": None,
            "max_distance_km": 3,
            "preferred_food_category_id": None,
            "amenities": {
                "wifi": "no_preference",
                "quiet": "no_preference",
                "laptop_friendly": "no_preference",
                "outdoor_seating": "no_preference",
                "pet_friendly": "no_preference"
            }
        }

        cafes = [
            {
                "name": "Cafe A",
                "price_level": 2,
                "distance_km": 1,
                "amenities": set(),
                "food_category_ids": set()
            },
            {
                "name": "Cafe B",
                "price_level": 2,
                "distance_km": None,
                "amenities": set(),
                "food_category_ids": set()
            }
        ]

        results = recommend_cafes(user, cafes)

        self.assertEqual(len(results), 2)
        self.assertEqual(results[0]["name"], "Cafe A")
        self.assertEqual(results[0]["match_percentage"], 100.0)
        self.assertEqual(results[1]["name"], "Cafe B")
        self.assertIsNone(results[1]["match_percentage"])

    def test_price_boundary(self):
        self.assertEqual(score_price(1, 1), 20)
        self.assertEqual(score_price(1, 2), 15)
        self.assertIsNone(score_price(1, 3))

    def test_distance_boundary(self):
        self.assertEqual(score_distance(3, 1), 20)
        self.assertEqual(score_distance(3, 2), 15)
        self.assertEqual(score_distance(3, 3), 10)
        self.assertIsNone(score_distance(3, 3.1))

    def test_food_category_match(self):
        user = {
            "max_price_level": None,
            "max_distance_km": None,
            "preferred_food_category_id": 4,
            "amenities": {}
        }

        cafe = {
            "name": "Italian Cafe",
            "price_level": 2,
            "distance_km": None,
            "amenities": set(),
            "food_category_ids": {2, 4}
        }

        result = score_cafe(user, cafe)

        self.assertEqual(result["status"], "scored")
        self.assertEqual(result["match_percentage"], 100.0)

    def test_food_category_mismatch(self):
        user = {
            "max_price_level": None,
            "max_distance_km": None,
            "preferred_food_category_id": 4,
            "amenities": {}
        }

        cafe = {
            "name": "Georgian Cafe",
            "price_level": 2,
            "distance_km": None,
            "amenities": set(),
            "food_category_ids": {1}
        }

        result = score_cafe(user, cafe)

        self.assertEqual(result["status"], "scored")
        self.assertEqual(result["match_percentage"], 0.0)

    def test_unscored_status(self):
        user = {
            "max_price_level": None,
            "max_distance_km": None,
            "preferred_food_category_id": None,
            "amenities": {}
        }

        cafe = {
            "name": "Cafe A",
            "price_level": 2,
            "distance_km": None,
            "amenities": set(),
            "food_category_ids": set()
        }

        result = score_cafe(user, cafe)

        self.assertEqual(result["status"], "unscored")
        self.assertIsNone(result["match_percentage"])

    def test_successful_scored_status(self):
        user = {
            "max_price_level": 2,
            "max_distance_km": None,
            "preferred_food_category_id": None,
            "amenities": {"wifi": "preferred"}
        }

        cafe = {
            "name": "Study Cafe",
            "price_level": 2,
            "distance_km": None,
            "amenities": {"wifi"},
            "food_category_ids": set()
        }

        result = score_cafe(user, cafe)

        self.assertEqual(result["status"], "scored")
        self.assertEqual(result["match_percentage"], 100.0)

if __name__ == "__main__":
    unittest.main()
