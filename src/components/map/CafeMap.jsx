import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { getCafesForMap } from "../../services/cafeService";

import "leaflet/dist/leaflet.css";
import "./CafeMap.css";
import { cafeMarkerIcon } from "./leafletIcons.js";

const TBILISI_CENTER = [41.7151, 44.8271];

export default function CafeMap() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const loadedCafes = await getCafesForMap();

        if (!Array.isArray(loadedCafes)) {
          throw new Error("Invalid café data");
        }

        if (active) {
          setCafes(loadedCafes);
        }
      } catch {
        if (active) {
          setError("Map data could not be loaded.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p role="status">Loading map...</p>;
  }

  if (error) {
    return <p role="alert">{error} You can still browse cafés in the list.</p>;
  }

const validCafes = cafes.filter((cafe) => {
  return (
  Number.isFinite(cafe.latitude) &&
  Number.isFinite(cafe.longitude) &&
  cafe.latitude >= -90 &&
  cafe.latitude <= 90 &&
  cafe.longitude >= -180 &&
  cafe.longitude <= 180
  );
});

  return (
    <div className="map-wrapper">
      <MapContainer
        center={TBILISI_CENTER}
        zoom={13}
        className="cafe-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validCafes.map((cafe) => (
          <Marker
          key={cafe.id}
          position={[cafe.latitude, cafe.longitude]}
          icon={cafeMarkerIcon}
          />
        ))}
      </MapContainer>
    </div>
  );
}
