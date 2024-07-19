import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line react/prop-types
const Navigation = ({ isSignedIn, onSignedInChange, onRouteChange }) => {
  if (isSignedIn) {
    // Template for when the user is logged in
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Logo */}
          <Link
            className="navbar-brand ms-auto"
            to="/home"
            onClick={() => {
              onSignedInChange(true);
              onRouteChange("home");
            }}
          >
            <h1 className="fs-1 fs-md-3 mb-0">
              Mobi<span className="text-warning">Exchange</span>
            </h1>
          </Link>

          {/* Button appears for mobile devices */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* The actual links from navbar */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              {/* SignOut Link */}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/signin"
                  onClick={() => {
                    onSignedInChange(false);
                    onRouteChange("signin");
                  }}
                  style={{
                    backgroundColor: '#FFD824',
                    color: 'black',
                    border: '1px solid black',
                    padding: '8px 16px',
                    marginRight: '60px',
                    fontSize: '18px',
                    fontFamily: 'Poppins',
                    borderRadius: '30px',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 15px',
                  }}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    // Template for when the user is NOT logged in
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Logo */}
          <Link
            className="navbar-brand ms-auto"
            to="/home"
            onClick={() => {
              onSignedInChange(true);
              onRouteChange("home");
            }}
          >
            <h1 className="fs-1 fs-md-3 mb-0">
              Mobi<span className="text-warning">Exchange</span>
            </h1>
          </Link>

          {/* Button appears for mobile devices */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* The actual links from navbar */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              {/* SignIn Link */}
              <li className="nav-item">
                <Link
                  className="nav-link d-block d-sm-inline text-end mx-2"
                  to="/signin"
                  onClick={() => {
                    onSignedInChange(false);
                    onRouteChange("signin");
                  }}
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    padding: '8px 16px',
                    fontFamily: 'Poppins',
                    fontSize: '15px',
                    borderRadius: '30px',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 15px',
                  }}
                >
                  Sign In
                </Link>
              </li>

              {/* Register Link */}
              <li className="nav-item">
                <Link
                  className="nav-link d-block d-sm-inline text-end mx-2"
                  to="/signup"
                  onClick={() => {
                    onSignedInChange(false);
                    onRouteChange("signup");
                  }}
                  style={{
                    backgroundColor: '#FFD824',
                    color: 'black',
                    border: '1px solid black',
                    padding: '8px 16px',
                    fontFamily: 'Poppins',
                    fontSize: '15px',
                    borderRadius: '30px',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 15px',
                  }}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navigation;
