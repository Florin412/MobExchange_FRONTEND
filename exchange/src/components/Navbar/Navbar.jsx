/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
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
      <div className="container-fluid good-navbar">
        {/* Logo */}
        <Link
          to={isSignedIn ? "/home" : "/signin"}
          className="navbar-brand d-flex align-items-center ms-3"
          style={{ marginRight: "60px" }}
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
            Mobi<span className="text-warning">Exchange</span>
          </h1>
        </Link>

        {isSignedIn && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              maxWidth: "800px", // Crește lățimea containerului
              width: "25%", // Ocupă întreaga lățime disponibilă
              margin: "0 auto" // Centrează elementul
            }}
          >
            {/* Input de căutare */}
            <input
              className="form-control"
              type="search"
              placeholder="Search for news, symbols or companies"
              aria-label="Search"
              style={{
                flex: "1", // Face input-ul să ocupe tot spațiul disponibil în container
                padding: "0.8rem 2rem",
                border: "1px solid #ccc",
                borderRadius: "15px 0 0 15px"
              }}
            />
            <button
              className="btn btn-success"
              type="submit"
              style={{
                padding: "0.9rem 1rem",
                border: "none",
                backgroundColor: "#28a745",
                color: "white",
                borderRadius: "0 15px 15px 0",
                cursor: "pointer"
              }}
            >
              Search
            </button>
          </div>
        )}

        {/* Dropdown pentru News */}
        {isSignedIn && (
          <div className="dropdown mx-3">
            <button
              className="btn btn-warning dropdown-toggle"
              type="button"
              id="newsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                fontSize: "1.7rem",
                padding: "5px 20px", // Mai mult padding
                transition: "background-color 0.3s"
              }}
            >
              News
            </button>
            <ul className="dropdown-menu" aria-labelledby="newsDropdown">
              <li>
                <Link
                  to="/news/business"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  {" "}
                  {/* Mărirea fontului */}
                  Business News
                </Link>
              </li>
              <li>
                <Link
                  to="/news/stocks"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Stocks News
                </Link>
              </li>
              <li>
                <Link
                  to="/news/crypto"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Crypto News
                </Link>
              </li>
              <li>
                <Link
                  to="/news/forex"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Forex
                </Link>
              </li>
              <li>
                <Link
                  to="/news/precious-metals"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Precious Metals
                </Link>
              </li>
              <li>
                <Link
                  to="/news/real-estate"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Real Estate
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Dropdown pentru Market */}
        {isSignedIn && (
          <div className="dropdown mx-3">
            <button
              className="btn btn-warning dropdown-toggle"
              type="button"
              id="marketDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                fontSize: "1.7rem", // Mărirea fontului
                padding: "5px 20px", // Mai mult padding
                transition: "background-color 0.3s"
              }}
            >
              Market
            </button>
            <ul className="dropdown-menu" aria-labelledby="marketDropdown">
              <li>
                <Link
                  to="/markets/overview"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/world-indices"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  World Indices
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/commodities"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Commodities
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/bonds"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Bonds
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/currencies"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Currencies
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/options/most-active"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Options
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/sectors"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Sectors
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/stocks/most-active"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Stocks
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/crypto/all"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Crypto
                </Link>
              </li>

              <li>
                <Link
                  to="/markets/etfs/most-active"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  ETFs
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/mutualfunds/gainers"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Mutual Funds
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Conditional rendering for profile image or hamburger menu */}
        {isSignedIn ? (
          <li
            className="nav-item dropdown d-lg-none"
            style={{ listStyleType: "none" }}
          >
            <a
              className="nav-link"
              href="#"
              id="profileDropdownMobile"
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
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end shadow-lg p-3"
              aria-labelledby="profileDropdownMobile"
              style={{
                backgroundColor: "#FFD824",
                border: "1px solid #FFD824",
                borderRadius: "10px",
                minWidth: "200px", // Lățime minimă pentru dropdown
                padding: "0" // Eliminăm padding-ul pentru a controla mai bine stilul
              }}
            >
              <li>
                <Link
                  to="/changePassword"
                  className="dropdown-item"
                  onClick={() => {
                    onRouteChange("changePassword");
                  }}
                  style={{
                    fontSize: "18px",
                    padding: "12px 20px",
                    borderRadius: "5px",
                    color: "black",
                    transition: "background-color 0.3s ease, color 0.3s ease" // Tranziție pentru fundal și culoare text
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f0c300"; // Schimbă culoarea fundalului la hover
                    e.target.style.color = "black"; // Schimbă culoarea textului la hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent"; // Revine la culoarea inițială
                    e.target.style.color = "black"; // Revine la culoarea inițială a textului
                  }}
                >
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="dropdown-item"
                  onClick={() => {
                    signOut();
                  }}
                  style={{
                    fontSize: "18px",
                    padding: "12px 20px",
                    borderRadius: "5px",
                    color: "black",
                    transition: "background-color 0.3s ease, color 0.3s ease" // Tranziție pentru fundal și culoare text
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f0c300"; // Schimbă culoarea fundalului la hover
                    e.target.style.color = "black"; // Schimbă culoarea textului la hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent"; // Revine la culoarea inițială
                    e.target.style.color = "black"; // Revine la culoarea inițială a textului
                  }}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              marginLeft: "10px",
              border: "2px solid white", // White border
              borderRadius: "4px", // Optional: adjust as needed
              padding: "8px" // Optional: adjust padding for better alignment
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                position: "relative",
                display: "block",
                width: "24px",
                height: "24px"
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "white", // White line
                  position: "absolute",
                  top: "4px",
                  left: "0"
                }}
              ></span>
              <span
                style={{
                  display: "block",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "white", // White line
                  position: "absolute",
                  top: "10px",
                  left: "0"
                }}
              ></span>
              <span
                style={{
                  display: "block",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "white", // White line
                  position: "absolute",
                  top: "16px",
                  left: "0"
                }}
              ></span>
            </span>
          </button>
        )}

        {/* The actual links from navbar */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav w-100 justify-content-center justify-content-lg-end">
            {isSignedIn ? (
              <li className="nav-item dropdown d-none d-lg-block">
                <a
                  className="nav-link"
                  href="#"
                  id="profileDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    padding: "0",
                    display: "flex",
                    alignItems: "center"
                  }}
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
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow-lg"
                  aria-labelledby="profileDropdown"
                  style={{
                    backgroundColor: "#FFD824",
                    border: "1px solid #FFD824"
                  }}
                >
                  <li>
                    <Link
                      to="/change-password"
                      className="dropdown-item"
                      onClick={() => {
                        onRouteChange("change-password");
                      }}
                      style={{ fontSize: "16px" }}
                    >
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signin"
                      className="dropdown-item"
                      onClick={() => {
                        onSignedInChange(false);
                        signOut();
                      }}
                      style={{ fontSize: "16px" }}
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                {/* SignIn Link */}
                <li className="nav-item text-center my-2 my-lg-0">
                  <Link
                    className="nav-link d-block d-sm-block mx-2"
                    to="/signin"
                    onClick={() => {
                      onSignedInChange(false);
                      onRouteChange("signin");
                    }}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                      padding: "10px 20px",
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      borderRadius: "30px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // Umbra neagră
                      textAlign: "center",
                      textDecoration: "none",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0px 6px 12px rgba(0, 0, 0, 0.5)";
                      e.currentTarget.style.backgroundColor = "#f0f0f0"; // Schimbă culoarea de fundal la hover
                      e.currentTarget.style.color = "black"; // Culoarea textului rămâne constantă
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0px 4px 8px rgba(0, 0, 0, 0.3)";
                      e.currentTarget.style.backgroundColor = "white"; // Restaurează culoarea de fundal
                    }}
                  >
                    Sign In
                  </Link>
                </li>

                {/* Register Link */}
                <li className="nav-item text-center my-2 my-lg-0">
                  <Link
                    className="nav-link d-block d-sm-block mx-2"
                    to="/register"
                    onClick={() => {
                      onSignedInChange(false);
                      onRouteChange("register");
                    }}
                    style={{
                      backgroundColor: "#FFD824",
                      color: "black",
                      border: "1px solid black",
                      padding: "10px 20px",
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      borderRadius: "30px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // Umbra neagră
                      textAlign: "center",
                      textDecoration: "none",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0px 6px 12px rgba(0, 0, 0, 0.5)";
                      e.currentTarget.style.backgroundColor = "#f7f0b8"; // Schimbă culoarea de fundal la hover
                      e.currentTarget.style.color = "black"; // Culoarea textului rămâne constantă
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0px 4px 8px rgba(0, 0,                       0, 0.3)"; // Restaurează culoarea de fundal
                      e.currentTarget.style.backgroundColor = "#FFD824"; // Restaurează culoarea de fundal
                    }}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
