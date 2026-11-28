import { Link } from "react-router";

function Register() {
  function handleSubmit(event) {
    event.preventDefault();

    // Backend registration will be connected later.
    console.log("Registration submitted");
  }

  return (
    <main className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter username"
          aria-label="Username"
          required
        />

        <input
          type="email"
          placeholder="enter email"
          aria-label="Email address"
          required
        />

        <input
          type="password"
          placeholder="enter your password"
          aria-label="Password"
          required
        />

        <input
          type="password"
          placeholder="repeat password"
          aria-label="Repeat password"
          required
        />

        <div className="signup-actions">
          <Link to="/login" className="login-button-outline">
            Log in
          </Link>

          <button type="submit" className="signup-button-filled">
            Sign up
          </button>
        </div>
      </form>
    </main>
  );
}

export default Register;