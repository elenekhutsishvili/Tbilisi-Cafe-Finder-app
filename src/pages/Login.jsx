import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  return (
    <div>
      <Header />

      <main className="page-content">
        <h1>Welcome Back</h1>
        <p>Log in to manage your cafés and preferences.</p>
      </main>

      <Footer />
    </div>
  );
}

export default Login;