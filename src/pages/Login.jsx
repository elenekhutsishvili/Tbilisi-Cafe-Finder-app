import { Link } from "react-router";

function Login() {
  function handleSubmit(event) {
    event.preventDefault();

    // Backend login will be connected later.
    console.log("Login submitted");
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email address"
          aria-label="Email address"
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          aria-label="Password"
          required
        />

        <button type="submit" className="login-button">
          Log in
        </button>

        <div className="login-options">
          <Link to="/register" className="signup-button">
            Sign up
          </Link>

          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Login;