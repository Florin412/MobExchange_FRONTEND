/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import SearchBar from "./SearchBar/SearchBar";

const Navigation = ({
  isSignedIn,
  onSignedInChange,
  onRouteChange,
  signOut
}) => {
  const [IsNewsOpen, setIsNewsOpen] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  const toggleDropdownNews = () => {
    setIsNewsOpen(!IsNewsOpen);
  };

  const toggleDropdownMarket = () => {
    setIsMarketOpen(!isMarketOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ minHeight: "70px" }}
    >
      <div className="container-fluid good-navbar">
        {/* MobiExchange Logo */}
        <Link
          to={isSignedIn ? "/home" : "/signin"}
          className="navbar-brand d-flex align-items-center ms-3"
          style={{ marginRight: "35px" }}
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

        {/* Search Bar that shows only for Desktop when user is logged*/}
        {isSignedIn && (
          <div className="hide-search-bar-on-mobile" style={{ width: "785px" }}>
            <SearchBar></SearchBar>
          </div>
        )}

        {/* Dropdown pentru News when user in logged on Desktop */}
        {isSignedIn && (
          <div className="dropdown mx-3 hide-news-on-mobile">
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

        {/* Dropdown pentru Market when user is loged and on Desktop */}
        {isSignedIn && (
          <div className="dropdown mx-3 hide-market-on-mobile">
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
                  Futures
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
                  to="/markets/stocks/most-active"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Stocks
                </Link>
              </li>
              <li>
                <Link
                  to="/markets/crypto/most-active"
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
                  to="/markets/mutual-funds/top-gainers"
                  className="dropdown-item"
                  style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                >
                  Mutual Funds
                </Link>
              </li>
            </ul>
          </div>
        )}

        {isSignedIn ? (
          <div>
            {/* Cand userul este logat pe Desktop, afiseaza un iconProfile cu 2 optiuni: Change Password si signOut */}
            <li
              className="nav-item dropdown d-lg-none hide-profile-on-mobile"
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

            {/* Cand userul este logat pe Mobile, afiseaza un button offcanvas */}
            {/* Mai jos sunt stilurile pentru buton */}

            <button
              className="navbar-toggler custom-toggler hide-on-desktop"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
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

            {/* In divul de mai jos sunt butoanele din canvasul de mai sus */}
            <div
              className="offcanvas offcanvas-end hide-on-desktop"
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  style={{
                    fontSize: "2rem",
                    borderRadius: "50%",
                    backgroundColor: "rgb(231, 231, 231)",
                    padding: "10px",
                    marginRight: "5px",
                    marginTop: "5px"
                  }}
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="news-container-for-mobile">
                  {/* Butonul pentru News */}
                  <button onClick={toggleDropdownNews} className="news-button">
                    News{" "}
                    <span style={{ fontSize: "15px" }}>
                      {IsNewsOpen ? "▲" : "▼"}
                    </span>
                  </button>
                  {IsNewsOpen && (
                    <ul className={`news-list ${IsNewsOpen ? "open" : ""}`}>
                      <li>
                        <Link to="/news/business" className="dropdown-item">
                          {" "}
                          Business News
                        </Link>
                      </li>
                      <li>
                        <Link to="/news/stocks" className="dropdown-item">
                          Stocks News
                        </Link>
                      </li>
                      <li>
                        <Link to="/news/crypto" className="dropdown-item">
                          Crypto News
                        </Link>
                      </li>
                      <li>
                        <Link to="/news/forex" className="dropdown-item">
                          Forex
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/news/precious-metals"
                          className="dropdown-item"
                        >
                          Precious Metals
                        </Link>
                      </li>
                      <li>
                        <Link to="/news/real-estate" className="dropdown-item">
                          Real Estate
                        </Link>
                      </li>
                    </ul>
                  )}

                  {/* Butonul pentru Market */}
                  <button
                    onClick={toggleDropdownMarket}
                    className="news-button"
                  >
                    Market{" "}
                    <span style={{ fontSize: "15px" }}>
                      {isMarketOpen ? "▲" : "▼"}
                    </span>
                  </button>
                  {isMarketOpen && (
                    <ul className={`news-list ${isMarketOpen ? "open" : ""}`}>
                      <li>
                        <Link to="/markets/overview" className="dropdown-item">
                          Overview
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/markets/world-indices"
                          className="dropdown-item"
                        >
                          World Indices
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/markets/commodities"
                          className="dropdown-item"
                        >
                          Futures
                        </Link>
                      </li>
                      <li>
                        <Link to="/markets/bonds" className="dropdown-item">
                          Bonds
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/markets/currencies"
                          className="dropdown-item"
                        >
                          Currencies
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/markets/options/most-active"
                          className="dropdown-item"
                        >
                          Options
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/markets/stocks/most-active"
                          className="dropdown-item"
                        >
                          Stocks
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/markets/crypto/most-active"
                          className="dropdown-item"
                        >
                          Crypto
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/markets/etfs/most-active"
                          className="dropdown-item"
                        >
                          ETFs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/markets/mutual-funds/top-gainers"
                          className="dropdown-item"
                        >
                          Mutual Funds
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>

                <div>
                  <Link
                    to="/change-password"
                    className="dropdown-item"
                    onClick={() => {
                      onRouteChange("change-password");
                    }}
                    style={{
                      fontSize: "16px",
                      marginLeft: "10px",
                      marginTop: "30px",
                      marginBottom: "10px"
                    }}
                  >
                    Change Password
                  </Link>
                </div>
                <div>
                  <Link
                    to="/signin"
                    className="dropdown-item"
                    onClick={() => {
                      onSignedInChange(false);
                      signOut();
                    }}
                    style={{ fontSize: "16px", marginLeft: "10px" }}
                  >
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Cand userul NU este logat, pe Mobile, afiseaza acest buton canvas, cu 2 optiuni: Sign IN si Sign Up
          <div>
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
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

            <div
              className="offcanvas offcanvas-end hide-on-desktop"
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  style={{
                    fontSize: "2rem",
                    borderRadius: "50%",
                    backgroundColor: "rgb(231, 231, 231)",
                    padding: "10px",
                    marginRight: "5px",
                    marginTop: "5px"
                  }}
                ></button>
              </div>
              <div className="offcanvas-body">
                <br />
                <br />

                <div>
                  {/* Sign in Link Button */}
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
                </div>

                <br />

                {/* Sign Up Link Button */}
                <div>
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
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav w-100 justify-content-center justify-content-lg-end">
            {isSignedIn ? (
              <div>
                {/* data utilizatorul este autentificat pe Desktop, se va afișa un element de tip dropdown care conține IMAGINEA DE PROFIL și opțiunile de meniu: change password si signout */}
                <div className="hide-profile-image-on-mobile">
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
                </div>
              </div>
            ) : (
              <>
                {/* CADND utilizatorul NU este autentificat pe DESKTOP, se vor afișa butoanele pentru Sign In și Sign Up. */}

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

      {/* Cand userul este LOGAT pe MOBIL, afiseaza acest search bar  */}
      {isSignedIn && (
        <div className="show-search-bar-on-mobile">
          <SearchBar></SearchBar>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
