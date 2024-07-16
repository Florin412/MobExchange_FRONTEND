import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-div">
      <h1>
        Mobi<span className="footer-span">Exchange</span>
      </h1>
      <div className="footer-links">
        <button className="footer-button">
          <h3 className="footer-text">
            <Link to="/about" className="link-footer">
              About
            </Link>
          </h3>
        </button>
        <button className="footer-button">
          <h3 className="footer-text">
            <Link to="/privacy" className="link-footer">
              Privacy
            </Link>
          </h3>
        </button>
        <button className="footer-button">
          <h3 className="footer-text">
            <Link to="/cookie" className="link-footer">
              Cookie
            </Link>
          </h3>
        </button>
      </div>
    </div>
  );
};

export default Footer;
