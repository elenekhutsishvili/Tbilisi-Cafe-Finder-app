import Header from "../components/Header";
import Footer from "../components/Footer";

function Admin() {
  return (
    <div>
      <Header />

      <main className="page-content">
        <h1>Admin Dashboard</h1>
        <p>Manage café information and user-submitted content.</p>
      </main>

      <Footer />
    </div>
  );
}

export default Admin;