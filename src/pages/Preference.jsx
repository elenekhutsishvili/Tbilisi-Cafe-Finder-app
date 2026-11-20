
import { useState } from "react";

const initialPreferences = {
  max_price_level: "",
  max_distance_km: "",
  preferred_food_category_id: "",
  amenities: {
    wifi: "no_preference",
    quiet: "no_preference",
    laptop_friendly: "no_preference",
    outdoor_seating: "no_preference",
    pet_friendly: "no_preference",
  },
};

const amenities = [
  { key: "wifi", label: "Wi-Fi" },
  { key: "quiet", label: "Quiet Atmosphere" },
  { key: "laptop_friendly", label: "Laptop Friendly" },
  { key: "outdoor_seating", label: "Outdoor Seating" },
  { key: "pet_friendly", label: "Pet Friendly" },
];

const foodCategories = [
  { id: 1, name: "Georgian" },
  { id: 2, name: "Asian" },
  { id: 3, name: "Mexican" },
  { id: 4, name: "Italian" },
];

function Preference() {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [message, setMessage] = useState("");

  function updatePreference(field, value) {
    setPreferences((previous) => ({
      ...previous,
      [field]: value,
    }));
    setMessage("");
  }

  function updateAmenity(amenity, value) {
    setPreferences((previous) => ({
      ...previous,
      amenities: {
        ...previous.amenities,
        [amenity]: value,
      },
    }));
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Temporary: Django API is not connected yet.
    console.log("Selected preferences:", preferences);

    setMessage(
      "Preferences captured! Backend saving is not connected yet."
    );
  }

  return (
    <main className="page-content">
      <h2>Your Café Preferences</h2>

      <p>
        Choose what matters most to you when looking for a café in Tbilisi.
      </p>

      <form onSubmit={handleSubmit}>
        <h3>Price Range</h3>
        <label htmlFor="price">Maximum preferred price: </label>
        <select
          id="price"
          value={preferences.max_price_level}
          onChange={(event) =>
            updatePreference("max_price_level", event.target.value)
          }
        >
          <option value="">No Preference</option>
          <option value="1">$ - Affordable</option>
          <option value="2">$$ - Moderate</option>
          <option value="3">$$$ - Expensive</option>
        </select>

        <h3>Distance</h3>
        <label htmlFor="distance">Maximum distance: </label>
        <select
          id="distance"
          value={preferences.max_distance_km}
          onChange={(event) =>
            updatePreference("max_distance_km", event.target.value)
          }
        >
          <option value="">No Preference</option>
          <option value="1">1 km</option>
          <option value="3">3 km</option>
          <option value="5">5 km</option>
        </select>

        <h3>Amenities</h3>
        <p>
          Required means the café must have the feature.
          Preferred means you would like it, but it is not mandatory.
        </p>

        {amenities.map((amenity) => (
          <div key={amenity.key} style={{ marginBottom: "16px" }}>
            <label htmlFor={amenity.key}>
              {amenity.label}:{" "}
            </label>

            <select
              id={amenity.key}
              value={preferences.amenities[amenity.key]}
              onChange={(event) =>
                updateAmenity(amenity.key, event.target.value)
              }
            >
              <option value="no_preference">No Preference</option>
              <option value="preferred">Preferred</option>
              <option value="required">Required</option>
            </select>
          </div>
        ))}

        <h3>Food Category</h3>
        <label htmlFor="food">Preferred food category: </label>

        <select
          id="food"
          value={preferences.preferred_food_category_id}
          onChange={(event) =>
            updatePreference(
              "preferred_food_category_id",
              event.target.value
            )
          }
        >
          <option value="">No Preference</option>

          {foodCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div style={{ marginTop: "24px" }}>
          <button type="submit">Save Preferences</button>
        </div>

        {message && <p role="status">{message}</p>}
      </form>
    </main>
  );
}

export default Preference;
