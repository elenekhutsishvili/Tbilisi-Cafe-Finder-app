import Header from "../components/Header";
import Footer from "../components/Footer";

function Preference() {
  return (
    <div>
      <Header />

      <main className="page-content">
        <h1>Your Café Preferences</h1>
        <p>Choose the café features that are important to you.</p>
      </main>

      <Footer />
    </div>
  );
}

export default Preference;