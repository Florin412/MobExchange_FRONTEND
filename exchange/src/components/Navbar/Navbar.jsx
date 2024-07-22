import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Asigură-te că Bootstrap JS este importat

const Navigation = ({ isSignedIn, onSignedInChange, onRouteChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: '70px' }}>
      <div className="container-fluid">
        {/* Logo */}
        <Link
          className="navbar-brand ms-3"
          to="/home"
          onClick={() => {
            onSignedInChange(true);
            onRouteChange("home");
          }}
        >
          <h1 className="mb-0" style={{ fontSize: '2.5rem' }}>
            Mobi<span className="text-warning">Exchange</span>
          </h1>
        </Link>


        {/* The actual links from navbar */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            {isSignedIn ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="profileDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    padding: '0',
                    marginRight: '60px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src="https://tse1.mm.bing.net/th?q=blank%20profile%20picture%20image&w=250&h=250&c=7"
                    alt="Profile"
                    style={{
                      width: '50px',  // Dimensiune imagine
                      height: '50px', // Dimensiune imagine
                      borderRadius: '50%',
                      cursor: 'pointer',
                      objectFit: 'cover',
                      boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 15px'
                    }}
                  />
                </a>

                <ul className="dropdown-menu dropdown-menu-end shadow-lg"
                    aria-labelledby="profileDropdown"
                    style={{
                      backgroundColor: '#FFD824', // Culoarea de fundal a dropdown-ului
                      border: '1px solid #FFD824' // Bordura dropdown-ului
                    }}>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#/change-password"
                      onClick={() => {
                        onRouteChange("change-password");
                      }}
                      style={{ fontSize: '16px' }}
                    >
                      Change Password
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/signin"
                      className="dropdown-item"
                      onClick={() => {
                        onSignedInChange(false);
                        onRouteChange("signin");
                      }}
                      style={{ fontSize: '16px' }}
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <>
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
                      fontSize: '18px',
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
                      fontSize: '18px',
                      borderRadius: '30px',
                      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 15px',
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
