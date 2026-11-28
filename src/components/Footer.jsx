import { Link } from "react-router";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-about">
          <Link to="/" className="footer-brand">
            <img src="/tcf-logo.png" alt="TCF logo" />
            <span>TCF</span>
          </Link>


          <Link to="/about-us" className="footer-about-link">

          <p>About us</p>

          </Link>
        </div>

        <div className="footer-contact">
          <h2>Contact us</h2>
          <p>☎ +995 555 555 555</p>
          <p>✉ TbilisiCafeFinder@gmail.com</p>
        </div>
      </div>

      <p className="copyright">
        © 2026 Tbilisi Café Finder
      </p>
    </footer>
  );
}

export default Footer;