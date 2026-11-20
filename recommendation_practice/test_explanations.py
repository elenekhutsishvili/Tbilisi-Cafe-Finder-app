
import unittest
from explanations import explain_recommendation


class TestExplanations(unittest.TestCase):

    def setUp(self):
        self.user = {
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

        self.cafe = {
            "name": "Study Bean",
            "price_level": 2,
            "distance_km": 0.8,
            "amenities": {"wifi", "quiet"},
            "food_category_ids": {2, 4}
        }

    def test_matching_price(self):
        result = explain_recommendation(self.user, self.cafe)

        self.assertIn(
            "Matches your preferred price range", result
        )

    def test_matching_distance(self):
        result = explain_recommendation(self.user, self.cafe)

        self.assertIn(
            "Within your preferred distance", result
        )

    def test_matching_wifi(self):
        result = explain_recommendation(self.user, self.cafe)

        self.assertIn("Offers Wi-Fi", result)

    def test_missing_amenity_not_explained(self):
        result = explain_recommendation(self.user, self.cafe)

        self.assertNotIn(
            "Offers pet-friendly facilities", result
        )

    def test_matching_food_category(self):
        result = explain_recommendation(self.user, self.cafe)

        self.assertIn(
            "Matches your preferred food category", result
        )

    def test_no_preferences(self):
        user = {
            "max_price_level": None,
            "max_distance_km": None,
            "preferred_food_category_id": None,
            "amenities": {}
        }

        result = explain_recommendation(user, self.cafe)

        self.assertEqual(result, [])


if __name__ == "__main__":
    unittest.main()
