/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onRouteChange, setIsSignedIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const onSubmitRegister = () => {
    console.log(firstName, lastName, email, password);

    axios
      .post("http://192.168.170.144:8080/auth/register", {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200 || response.status === 201) {
          console.log("Register was a success.");

          const accessToken = response.data.accessToken; // Access token received from the response
          const refreshToken = response.data.refreshToken; // Refresh token received from the response

          // Store the tokens in Local Storage for future use
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Redirect the user to the main page
          navigate("/home");
          setIsSignedIn(true);
          onRouteChange("home");
        } else {
          console.error("Register was a fail.");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  const verifyInputsData = (event) => {
    event.preventDefault();

    // Reset error messages
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true; // Flag to track overall validity

    // Validate first name
    if (firstName.trim() === "") {
      setFirstNameError("First name is required.");
      isValid = false;
    }

    // Validate last name
    if (lastName.trim() === "") {
      setLastNameError("Last name is required.");
      isValid = false;
    }

    // Validate email
    if (email.trim() === "") {
      setEmailError("Email is required.");
      isValid = false;
    }

    // Validate password length
    if (password.length < 6 || password.length > 20) {
      setPasswordError("Password must be between 6-20 characters.");
      isValid = false;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    // If all validations pass, submit the form
    if (isValid) {
      onSubmitRegister(); // Call the API to register
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#181A20",
        padding: "20px"
      }}
    >
      <div
        className="signin-form"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "50px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        }}
      >
        <form
          className="row g-3"
          onSubmit={verifyInputsData}
          style={{ fontFamily: "Poppins" }}
        >
          <h1
            className="Sign display-1 text-warning mb-4"
            style={{ fontSize: "40px", fontFamily: "Poppins" }}
          >
            Sign up
          </h1>
          <div className="mb-3 text-start">
            <div className="col-md-12 mb-5">
              <label htmlFor="firstName" className="form-label text-warning">
                <h2 className="fs-1 mb-2 text-start">First Name:</h2>
              </label>
              <input
                type="text"
                className="form-control form-control-sm rounded-5"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstNameError && (
                <div
                  className="fs-3 error-message text-danger"
                  style={{ marginTop: "10px" }}
                >
                  {firstNameError}
                </div>
              )}
            </div>
            <div className="col-md-12 mb-2">
              <label htmlFor="lastName" className="form-label text-warning">
                <h2 className="fs-1 mb-2 text-start">Last Name:</h2>
              </label>
              <input
                type="text"
                className="form-control form-control-sm rounded-5"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastNameError && (
                <div
                  className="fs-3 error-message text-danger"
                  style={{ marginTop: "10px" }}
                >
                  {lastNameError}
                </div>
              )}
            </div>
            <div className="col-md-12 mb-2">
              <label htmlFor="email" className="form-label text-warning">
                <h2 className="fs-1 mb-2 text-start">Email:</h2>
              </label>
              <input
                type="email"
                className="form-control form-control-sm rounded-5"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <div
                  className="fs-3 error-message text-danger"
                  style={{ marginTop: "10px" }}
                >
                  {emailError}
                </div>
              )}
            </div>
            <div className="col-md-12 mb-2">
              <label htmlFor="password" className="form-label text-warning">
                <h2 className="fs-1 mb-2 text-start">Password:</h2>
              </label>
              <input
                type="password"
                className="form-control form-control-sm rounded-5"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div
                  className="fs-3 error-message text-danger"
                  style={{ marginTop: "10px" }}
                >
                  {passwordError}
                </div>
              )}
            </div>
            <div className="col-md-12 mb-5">
              <label
                htmlFor="confirmPassword"
                className="form-label text-warning"
              >
                <h2 className="fs-1 mb-2 text-start">Confirm Password:</h2>
              </label>
              <input
                type="password"
                className="form-control form-control-sm rounded-5"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && (
                <div
                  className="fs-3 error-message text-danger"
                  style={{ marginTop: "10px" }}
                >
                  {confirmPasswordError}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-warning rounded-5">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
