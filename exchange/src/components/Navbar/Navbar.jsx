/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navigation = ({
  isSignedIn,
  onSignedInChange,
  onRouteChange,
  signOut
}) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ height: "70px" }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link
          to={isSignedIn ? "/home" : "/signin"}
          className="navbar-brand d-flex align-items-center ms-3"
        >
          <h1
            className="mb-0 d-flex align-items-center"
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              letterSpacing: "0px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
            }}
          >
            Mobi
            <span
              className="text-warning"
              style={{
                fontWeight: "700",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
              }}
            >
              Exchange
            </span>
          </h1>
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ marginLeft: "10px" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav d-flex align-items-center">
            {/* News Dropdown */}
            {isSignedIn && (
              <li className="nav-item dropdown me-3">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="newsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: "18px" }}
                >
                  News
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow-lg"
                  aria-labelledby="newsDropdown"
                  style={{
                    backgroundColor: "#FFD824",
                    border: "1px solid #FFD824"
                  }}
                >
                  <li>
                    <Link
                      to="/news/business"
                      className="dropdown-item"
                      style={{ fontSize: "18px" }}
                    >
                      Business
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/news/stocks"
                      className="dropdown-item"
                      style={{ fontSize: "18px" }}
                    >
                      Stocks
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/news/crypto"
                      className="dropdown-item"
                      style={{ fontSize: "18px" }}
                    >
                      Crypto
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/news/forex"
                      className="dropdown-item"
                      style={{ fontSize: "18px" }}
                    >
                      Forex
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/news/real-estate"
                      className="dropdown-item"
                      style={{ fontSize: "18px" }}
                    >
                      Real Estate
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/news/precious-metals"
                      className="dropdown-item"
                      style={{ fontSize: "18px" }}
                    >
                      Precious Metals
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          {/* Profile Icon */}
          {isSignedIn && (
            <div className="d-flex align-items-center me-3">
              <Link
                className="nav-link"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ padding: "0", display: "flex", alignItems: "center" }}
              >
                <img
                  src="https://tse1.mm.bing.net/th?q=blank%20profile%20picture%20image&w=250&h=250&c=7"
                  alt="Profile"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    objectFit: "cover",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 5px 15px"
                  }}
                />
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-lg p-3"
                aria-labelledby="profileDropdown"
                style={{
                  backgroundColor: "#FFD824",
                  border: "1px solid #FFD824",
                  borderRadius: "10px",
                  minWidth: "200px",
                  padding: "0"
                }}
              >
                <li>
                  <Link
                    to="/changePassword"
                    className="dropdown-item"
                    onClick={() => onRouteChange("changePassword")}
                    style={{
                      fontSize: "18px",
                      padding: "12px 20px",
                      borderRadius: "5px",
                      color: "black",
                      transition: "background-color 0.3s ease, color 0.3s ease"
                    }}
                  >
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signin"
                    className="dropdown-item"
                    onClick={() => signOut()}
                    style={{
                      fontSize: "18px",
                      padding: "12px 20px",
                      borderRadius: "5px",
                      color: "black",
                      transition: "background-color 0.3s ease, color 0.3s ease"
                    }}
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Sign In/Sign Up buttons */}
          {!isSignedIn && (
            <div className="d-flex align-items-center">
              <Link
                className="btn btn-light mx-2"
                to="/signin"
                onClick={() => {
                  onSignedInChange(false);
                  onRouteChange("signin");
                }}
              >
                Sign In
              </Link>
              <Link
                className="btn btn-warning"
                to="/signup"
                onClick={() => {
                  onSignedInChange(false);
                  onRouteChange("signup");
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
