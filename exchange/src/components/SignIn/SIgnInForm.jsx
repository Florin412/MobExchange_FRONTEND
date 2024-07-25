/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = ({ onRouteChange, setIsSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // This function allow us to navitate in different pages.
  // It uses react route v5, so it could change in time and not working, so read the docs if error appears.
  let navigate = useNavigate();

  const onSubmitSignIn = () => {
    // Send a POST request to the login API endpoint
    axios
      .post("http://192.168.170.144:8080/auth/login", {
        email: email,
        password: password
      })
      .then((response) => {
        console.log(response);

        // If the response status is 200 (OK), log in was successful
        if (response.status === 200 || response.status === 201) {
          console.log("SignIn was a success.");

          const accessToken = response.data.accessToken; // Access token received from the response
          const refreshToken = response.data.refreshToken; // Refresh token received from the response

          // Store the tokens in Local Storage for future use
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Redirect the user to the main page
          onRouteChange("home");
          setIsSignedIn(true);
          navigate("/home"); // this line just changes the URL route to .../home
        } else {
          // If the response status is not 200, login failed
          console.error("SignIn was a fail.");
        }
      })
      .catch((error) => {
        // Handle network errors
        console.error("Network error:", error);
      });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateInputsData = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    }

    if (valid) {
      console.log("Form submitted");
      // Send a POST request to the login API endpoint.
      onSubmitSignIn();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#181A20", marginTop: "-40px" }}>
      <div className="bg-dark text-light p-4 rounded-4" style={{ maxWidth: "600px", width: "100%", boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3), 0 6px 6px rgba(0, 0, 0, 0.1)" }}>
        <form className="row g-4" onSubmit={validateInputsData}>
          <h1 className="text-warning text-center mb-4 fw-bold pt-3" style={{ fontSize: "48px", fontFamily: "Poppins", textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}>
            Sign in
          </h1>
          <div className="mb-4">
            <label htmlFor="InputEmail" className="form-label text-warning">
              <h2 className="fs-1 mb-2" style={{ marginLeft: "60px" }}>Email address:</h2>
            </label>
            <input
              type="text"
              className="form-control form-control-sm rounded-pill px-4 w-100"
              id="InputEmail"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div className="fs-3 text-danger" style={{ marginTop: "10px", marginLeft: "40px" }}>
                {emailError}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="InputPassword" className="form-label text-warning">
              <h2 className="fs-1 mb-2" style={{ marginLeft: "60px" }}>Password:</h2>
            </label>
            <input
              type="password"
              className="form-control form-control-sm rounded-pill px-4"
              id="InputPassword"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className="fs-3 text-danger" style={{ marginTop: "10px", marginLeft: "40px" }}>
                {passwordError}
              </div>
            )}
          </div>
          <div className="text-center mb-4">
            <Link to="/forgotpassword" className="text-warning text-decoration-none fs-3">Forgot Password</Link>
          </div>
          <div className="text-center pb-4">
            <button
              type="submit"
              className="btn btn-warning rounded-pill shadow-lg"
              style={{ padding: "12px 40px", fontSize: "18px", fontWeight: "bold" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
