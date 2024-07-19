import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navigation = ({ isSignedIn, onSignedInChange, onRouteChange }) => {
  if (isSignedIn) {
    // Here is the template for when the user is logged in.
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary" >
        <div className="container-fluid" >
          {/* Logo */}
          <Link
            className="navbar-brand"
            to="/home"
            onClick={() => {
              onSignedInChange(true);
              onRouteChange("home");
            }}
            style={{ marginLeft: '50px', fontSize: '25px' }}
          >
           <span style={{ color: 'white' }}>Mobi</span>
           <span style={{ color: '#FFD824' }}>Exchange</span>
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
                >
                  SignOut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    // Here is the template for when the user is NOT logged in.
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
          <div className="container-fluid" style={{ backgroundColor: "#28292D", margin: "-6px 0px", height: "70px"}}>
            {/* Logo */}
            <Link
              className="navbar-brand"
              to="/home"
              onClick={() => {
                onSignedInChange(true);
                onRouteChange("home");
              }}
              style={{ marginLeft: '50px', fontSize: '35px', fontFamily: "Poppins" }}
            >
              <span style={{ color: 'white' }}>Mobi</span>
              <span style={{ color: '#FFD824' }}>Exchange</span>
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
                    className="nav-link"
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
                      marginRight: '10px',
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
                    className="nav-link"
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
                      marginRight: '60px',
                      fontSize: '18px',  
                      fontFamily: 'Poppins',
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
      </div>
    );
  }
};

export default Navigation;
