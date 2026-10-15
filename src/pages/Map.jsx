import Header from "../components/Header";
import Footer from "../components/Footer";

function MapPage() {
  return (
    <div>
      <Header />

      <main className="page-content">
        <h1>Find Cafés on the Map</h1>
        <p>Explore café locations around Tbilisi.</p>
      </main>

      <Footer />
    </div>
  );
}

export default MapPage;