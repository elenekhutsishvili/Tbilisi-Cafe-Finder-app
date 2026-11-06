import CafeMap from "../components/map/CafeMap";
import "./Map.css";

function MapPage() {
  return (
    <main className="page-content map-page">
      <h1>Explore Cafés in Tbilisi</h1>
      <p>Discover cafés around Tbilisi using our interactive map.</p>
      <CafeMap />
    </main>
  );
}

export default MapPage;