import Header from "../components/Header";
import Footer from "../components/Footer";

function Profile() {
  return (
    <div>
      <Header />

      <main className="page-content">
        <h1>Your Profile</h1>
        <p>View and manage your account information.</p>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;