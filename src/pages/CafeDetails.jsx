import Header from "../components/Header";
import Footer from "../components/Footer";

function CafeDetails() {
  return (
    <div>
      <Header />

      <main className="page-content">
        <h1>Café Details</h1>
        <p>View information, amenities, ratings, reviews, and location.</p>
      </main>

      <Footer />
    </div>
  );
}

export default CafeDetails;