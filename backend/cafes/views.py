from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Cafes, Amenities, CafeAmenities
from .serializers import CafeSerializer


AMENITY_NAMES = {
    "wifi": "Wi-Fi",
    "quiet": "Quiet Atmosphere",
    "laptop_friendly": "Laptop Friendly",
    "outdoor_seating": "Outdoor Seating",
    "pet_friendly": "Pet Friendly",
}


@api_view(["GET"])
def cafe_list(request):
    cafes = Cafes.objects.filter(is_active=True)

    amenities_param = request.query_params.get("amenities", "")

    if amenities_param:
        selected_amenities = [
            amenity.strip().lower()
            for amenity in amenities_param.split(",")
        ]

        if any(not amenity for amenity in selected_amenities):
            return Response(
                {"error": "Amenity values cannot be empty."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        invalid_amenities = [
            amenity
            for amenity in selected_amenities
            if amenity not in AMENITY_NAMES
        ]

        if invalid_amenities:
            return Response(
                {
                    "error": "Unsupported amenities.",
                    "invalid_amenities": invalid_amenities,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        for amenity in set(selected_amenities):
            matching_cafe_ids = CafeAmenities.objects.filter(
                amenity__name=AMENITY_NAMES[amenity]
            ).values("cafe_id")

            cafes = cafes.filter(
                cafe_id__in=matching_cafe_ids
            )

    cafes = cafes.order_by("cafe_id")

    serializer = CafeSerializer(cafes, many=True)

    return Response({
        "count": cafes.count(),
        "results": serializer.data,
    })