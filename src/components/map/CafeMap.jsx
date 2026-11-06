import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { getCafesForMap } from "../../services/cafeService";

import "leaflet/dist/leaflet.css";
import "./CafeMap.css";
import "./leafletIcons.js";

const TBILISI_CENTER = [41.7151, 44.8271];

export default function CafeMap() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const cafes = await getCafesForMap();

        if (!Array.isArray(cafes)) {
          throw new Error("Invalid café data");
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
      </MapContainer>
    </div>
  );
}
