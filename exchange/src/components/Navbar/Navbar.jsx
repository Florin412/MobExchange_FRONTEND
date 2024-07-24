import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navigation = ({ isSignedIn, onSignedInChange, onRouteChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: '70px' }}>
      <div className="container-fluid">
        {/* Logo */}
        <Link
          className="navbar-brand d-flex align-items-center ms-3"
          to="/home"
          onClick={() => {
            onSignedInChange(true);
            onRouteChange("home");
          }}
        >
          <h1
            className="mb-0 d-flex align-items-center"
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              letterSpacing: '0px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}
          >
            Mobi
            <span className="text-warning" style={{ fontWeight: '700', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              Exchange
            </span>
          </h1>
        </Link>

        {/* Conditional rendering for profile image or hamburger menu */}
        {isSignedIn ? (
          <li className="nav-item dropdown d-lg-none" style={{ listStyleType: 'none'  }}>
            <a
              className="nav-link"
              href="#"
              id="profileDropdownMobile"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                padding: '0',
              }}
            >
              <img
                src="https://tse1.mm.bing.net/th?q=blank%20profile%20picture%20image&w=250&h=250&c=7"
                alt="Profile"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  objectFit: 'cover',
                  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 15px'
                }}
              />
            </a>
            <ul className="dropdown-menu dropdown-menu-end shadow-lg p-3"
                aria-labelledby="profileDropdownMobile"
                style={{
                  backgroundColor: '#FFD824',
                  border: '1px solid #FFD824',
                  borderRadius: '10px', // Colțuri rotunjite
                  minWidth: '200px', // Lățime minimă pentru dropdown
                  padding: '0', // Eliminăm padding-ul pentru a controla mai bine stilul
                }}>
              <li>
                <Link
                  to="/change-password"
                  className="dropdown-item"
                  onClick={() => {
                    onRouteChange("/change-password");
                  }}
                  style={{
                    fontSize: '18px',
                    padding: '12px 20px', 
                    borderRadius: '5px', 
                    color: 'black', 
                    transition: 'background-color 0.3s ease, color 0.3s ease', // Tranziție pentru fundal și culoare text
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f0c300'; // Schimbă culoarea fundalului la hover
                    e.target.style.color = 'black'; // Schimbă culoarea textului la hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'; // Revine la culoarea inițială
                    e.target.style.color = 'black'; // Revine la culoarea inițială a textului
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
                    onSignedInChange(false);
                    onRouteChange("signin");
                  }}
                  style={{
                    fontSize: '18px', 
                    padding: '12px 20px', 
                    borderRadius: '5px', 
                    color: 'black', 
                    transition: 'background-color 0.3s ease, color 0.3s ease', // Tranziție pentru fundal și culoare text
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f0c300'; // Schimbă culoarea fundalului la hover
                    e.target.style.color = 'black'; // Schimbă culoarea textului la hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'; // Revine la culoarea inițială
                    e.target.style.color = 'black'; // Revine la culoarea inițială a textului
                  }}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
            style={{
              marginLeft: '10px',
              border: '2px solid white', // White border
              borderRadius: '4px', // Optional: adjust as needed
              padding: '8px', // Optional: adjust padding for better alignment
            }}>
            <span className="navbar-toggler-icon" style={{ position: 'relative', display: 'block', width: '24px', height: '24px' }}>
              <span style={{
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: 'white', // White line
                position: 'absolute',
                top: '4px',
                left: '0'
              }}></span>
              <span style={{
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: 'white', // White line
                position: 'absolute',
                top: '10px',
                left: '0'
              }}></span>
              <span style={{
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: 'white', // White line
                position: 'absolute',
                top: '16px',
                left: '0'
              }}></span>
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
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src="https://tse1.mm.bing.net/th?q=blank%20profile%20picture%20image&w=250&h=250&c=7"
                    alt="Profile"
                    style={{
                      width: '50px',
                      height: '50px',
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
                      backgroundColor: '#FFD824',
                      border: '1px solid #FFD824'
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
                <li className="nav-item text-center my-2 my-lg-0">
                  <Link
                    className="nav-link d-block d-sm-block mx-2"
                    to="/signin"
                    onClick={() => {
                      onSignedInChange(false);
                      onRouteChange("signin");
                    }}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      border: '1px solid black',
                      padding: '10px 20px',
                      fontFamily: 'Poppins',
                      fontSize: '18px',
                      borderRadius: '30px',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Umbra neagră
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.5)';
                      e.currentTarget.style.backgroundColor = '#f0f0f0'; // Schimbă culoarea de fundal la hover
                      e.currentTarget.style.color = 'black'; // Culoarea textului rămâne constantă
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
                      e.currentTarget.style.backgroundColor = 'white'; // Restaurează culoarea de fundal
                    }}
                  >
                    Sign In
                  </Link>
                </li>

                {/* Register Link */}
                <li className="nav-item text-center my-2 my-lg-0">
                  <Link
                    className="nav-link d-block d-sm-block mx-2"
                    to="/signup"
                    onClick={() => {
                      onSignedInChange(false);
                      onRouteChange("signup");
                    }}
                    style={{
                      backgroundColor: '#FFD824',
                      color: 'black',
                      border: '1px solid black',
                      padding: '10px 20px',
                      fontFamily: 'Poppins',
                      fontSize: '18px',
                      borderRadius: '30px',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Umbra neagră
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.5)';
                      e.currentTarget.style.backgroundColor = '#f7f0b8'; // Schimbă culoarea de fundal la hover
                      e.currentTarget.style.color = 'black'; // Culoarea textului rămâne constantă
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
                      e.currentTarget.style.backgroundColor = '#FFD824'; // Restaurează culoarea de fundal
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
