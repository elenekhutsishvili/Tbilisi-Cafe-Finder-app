import { Link, NavLink } from "react-router";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
    <Link to="/" className="navbar-brand">
      <img src="/tcf-logo.png" alt="TCF logo" />
      <span>TCF</span>
    </Link>

      <ul>
        <li>
          <NavLink to="/cafe" className={navLinkClass}>
            Browse Cafés
          </NavLink>
        </li>

        <li>
          <NavLink to="/map" className={navLinkClass}>
            Map
          </NavLink>
        </li>

        <li>
          <NavLink to="/login" className={navLinkClass}>
            Log in
          </NavLink>
        </li>

        <li>
          <NavLink to="/register" className={navLinkClass}>
            Sign up
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;