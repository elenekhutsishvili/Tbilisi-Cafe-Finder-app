import Header from "../components/Header";
import Footer from "../components/Footer";

function Cafe() {
  return (
    <div>
      <Header/>

      <main className="page-content">
        <h1>Browse Cafés</h1>
        <p>
          Search and explore cafés available in Tbilisi.
        </p>
      </main>

      <Footer/>
    </div>
  );
}

export default Cafe;