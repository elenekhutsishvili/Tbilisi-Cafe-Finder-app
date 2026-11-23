from rest_framework import serializers
from .models import Cafes, CafeAmenities


class CafeSerializer(serializers.ModelSerializer):
    amenities = serializers.SerializerMethodField()

    class Meta:
        model = Cafes
        fields = [
            "cafe_id",
            "name",
            "description",
            "neighborhood",
            "address",
            "latitude",
            "longitude",
            "price_level",
            "opening_hours",
            "image_url",
            "amenities",
        ]

    def get_amenities(self, cafe):
        relationships = CafeAmenities.objects.filter(
            cafe=cafe
        ).select_related("amenity")

        return [
            relationship.amenity.name
            for relationship in relationships
        ]