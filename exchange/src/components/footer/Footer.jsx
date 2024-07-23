import { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  const [activeButton, setActiveButton] = useState(null);

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
  };

  const activeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffd824', // Highlight active button with a different color
  };

  const handleMouseDown = (button) => {
    setActiveButton(button);
  };

  const handleMouseUp = () => {
    setActiveButton(null);
  };

  return (
    <footer className="container-fluid px-4 py-3 bg-dark text-light">
      <div className="row align-items-center" style={{ height: '70px' }}>
        {/* Logo Section */}
        <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
          <h1 className="fs-md-3 mb-0" style={{ fontSize: "26px" }}>
            Mobi<span className="text-warning">Exchange</span>
          </h1>
        </div>
        {/* Links Section */}
        <div className="col-12 col-md-6 d-flex flex-column flex-md-row justify-content-center justify-content-md-end align-items-center gap-3">
          <button
            className="btn"
            style={activeButton === "about" ? activeButtonStyle : buttonStyle}
            onMouseDown={() => handleMouseDown("about")}
            onMouseUp={handleMouseUp}
          >
            <h3 className="m-0 fs-2 fs-md-5">
              <Link to="/about" className="text-white text-decoration-none">
                About
              </Link>
            </h3>
          </button>
          <button
            className="btn"
            style={activeButton === "privacy" ? activeButtonStyle : buttonStyle}
            onMouseDown={() => handleMouseDown("privacy")}
            onMouseUp={handleMouseUp}
          >
            <h3 className="m-0 fs-2 fs-md-5">
              <Link to="/privacy" className="text-white text-decoration-none">
                Privacy
              </Link>
            </h3>
          </button>
          <button
            className="btn"
            style={activeButton === "cookie" ? activeButtonStyle : buttonStyle}
            onMouseDown={() => handleMouseDown("cookie")}
            onMouseUp={handleMouseUp}
          >
            <h3 className="m-0 fs-2 fs-md-5">
              <Link to="/cookie" className="text-white text-decoration-none">
                Cookie
              </Link>
            </h3>
          </button>
        </div>
      </div>
      {/* Extend background color on mobile */}
      <div className="d-block d-md-none" style={{
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: '70px', // Ensure it matches the footer height
        backgroundColor: '#28292D', // Match the background color
        zIndex: -1, // Ensure it doesn't cover footer content
      }}></div>
    </footer>
  );
};

export default Footer;
