import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <Link to="/cafe">Browse Café</Link>
        </li>

        <li>
          <Link to="/map">Map</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/register">Sign Up</Link>
        </li>

        <li>
          <Link to="/favorites">Favorites</Link>
        </li>

        <li>
          <Link to="/preference">Preference</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;