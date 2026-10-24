import Header from "../components/Header";
import Footer from "../components/Footer";

function Cafe() {
  return (
    <div>

      <main className="page-content">
        <p>This page will be for browsing and searching cafés in Tbilisi.</p>
        <p>it will include: </p>
        <ul>
           <li>List of café cards</li>
           <li>Search by café name or neighborhood</li>
           <li>Filter by price range or ratings</li>
           <li>Button to save a café to Favorites</li>
        </ul>
        
      </main>

    </div>
  );
}

export default Cafe;