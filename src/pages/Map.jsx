import { useState } from "react";

import CafeMap from "../components/map/CafeMap";
import AmenityFilter from "../components/AmenityFilter";
import "./Map.css";

function MapPage() {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  return (
    <main className="page-content map-page">
      <h1>Explore Cafés in Tbilisi</h1>

      <p>
        Discover cafés around Tbilisi using our interactive map.
      </p>

      <AmenityFilter
        selectedAmenities={selectedAmenities}
        onChange={setSelectedAmenities}
      />

      <CafeMap selectedAmenities={selectedAmenities} />
    </main>
  );
}

export default MapPage;