import Header from "../components/Header";
import Footer from "../components/Footer";

function Favorites() {
  return (
    <div>
      <Header />

      <main className="page-content">
        <h1>Your Favorite Cafés</h1>
        <p>View the cafés you have saved for later.</p>
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;