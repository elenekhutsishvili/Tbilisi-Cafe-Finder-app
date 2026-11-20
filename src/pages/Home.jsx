import { Link } from "react-router";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <h1>Welcome to Tbilisi Café Finder</h1>

        <p>
          Find cafés in Tbilisi that match your preferences.
        </p>

        <Link to="/cafe" className="browsing-button">
          Browse Cafés
        </Link>
        
      </section>
    </main>
  );
}

export default Home;