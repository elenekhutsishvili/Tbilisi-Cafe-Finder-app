const AMENITIES = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "quiet", label: "Quiet Atmosphere" },
  { id: "laptop_friendly", label: "Laptop Friendly" },
  { id: "outdoor_seating", label: "Outdoor Seating" },
  { id: "pet_friendly", label: "Pet Friendly" },
];

export default function AmenityFilter({
  selectedAmenities,
  onChange,
}) {
  function handleToggle(amenityId) {
    if (selectedAmenities.includes(amenityId)) {
      onChange(
        selectedAmenities.filter((id) => id !== amenityId)
      );
    } else {
      onChange([...selectedAmenities, amenityId]);
    }
  }

  return (
    <fieldset className="amenity-filter">
      <legend>Filter by amenities</legend>

      <div className="amenity-options">
        {AMENITIES.map((amenity) => (
          <label key={amenity.id}>
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity.id)}
              onChange={() => handleToggle(amenity.id)}
            />
            {amenity.label}
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([])}
        disabled={selectedAmenities.length === 0}
      >
        Clear filters
      </button>
    </fieldset>
  );
}