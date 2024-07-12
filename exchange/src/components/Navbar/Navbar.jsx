import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navigation = ({ isSignedIn, onRouteChange }) => {
  //console.log(props);

  if (isSignedIn) {
    // Here is the template for when the user is logged in.
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" 
          to="/home">
            Mobiversal
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
                <a className="nav-link" href="#">
                  SignOut
                </a>
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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            {/* Logo */}
            <Link className="navbar-brand" 
            to="/home">
              Mobiversal
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
                  to="/signin">
                    SignIn
                  </Link>
                </li>

                {/* Register Link */}
                <li className="nav-item">
                  <a 
                  className="nav-link" 
                  href="/register" >
                    Register
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  //   return (
  //     <div>
  //       <nav className="navbar navbar-expand-lg bg-body-tertiary">
  //         <div className="container-fluid">
  //           {/* Logo */}
  //           <a className="navbar-brand" href="#">
  //             Mobiversal
  //           </a>

  //           {/* Button appears for mobile devices */}
  //           <button
  //             className="navbar-toggler"
  //             type="button"
  //             data-bs-toggle="collapse"
  //             data-bs-target="#navbarSupportedContent"
  //             aria-controls="navbarSupportedContent"
  //             aria-expanded="false"
  //             aria-label="Toggle navigation"
  //           >
  //             <span className="navbar-toggler-icon"></span>
  //           </button>

  //           {/* The actual links from navbar */}
  //           <div
  //             className="collapse navbar-collapse justify-content-end"
  //             id="navbarSupportedContent"
  //           >
  //             <ul className="navbar-nav">
  //               {/* SignIn Link */}
  //               <li className="nav-item">
  //                 <a className="nav-link" href="#">
  //                   SignIn
  //                 </a>
  //               </li>

  //               {/* Register Link */}
  //               <li className="nav-item">
  //                 <a className="nav-link" href="#">
  //                   Register
  //                 </a>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </nav>
  //     </div>
  //   );
};

export default Navigation;
