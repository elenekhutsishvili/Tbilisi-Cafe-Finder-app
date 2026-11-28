from django.test import SimpleTestCase
from unittest.mock import patch

from cafes.views import AMENITY_NAMES


class AmenityConfigurationTests(SimpleTestCase):

    def test_all_five_amenities_are_supported(self):
        self.assertEqual(len(AMENITY_NAMES), 5)

    def test_amenity_identifiers(self):
        self.assertEqual(
            set(AMENITY_NAMES.keys()),
            {
                "wifi",
                "quiet",
                "laptop_friendly",
                "outdoor_seating",
                "pet_friendly",
            },
        )