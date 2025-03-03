/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../assets/api_url";
import "../SignIn/SIgnInForm.css";

const SignUp = ({ onRouteChange, setIsSignedIn, getUserName }) => {
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

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const onSubmitRegister = () => {
    //console.log(firstName, lastName, email, password);

    axios
      .post(`${apiUrl}/auth/register`, {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          // console.log("Register was a success.");

          const accessToken = response.data.accessToken; // Access token received from the response
          const refreshToken = response.data.refreshToken; // Refresh token received from the response

          // Get the userName and store it.
          getUserName(accessToken);

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
        // Verificăm dacă este o eroare Axios și are status 400
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          const errorMessage = error.response.data; // Extragem mesajul din data

          if (errorMessage.includes("Email already used")) {
            setEmailError("Email alredy used.");
          }
        }

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

    // -- Validate email

    // Verify if email is valid
    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    }

    // Verify if email field is empty
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
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#181A20" }}
    >
      <div
        className="bg-dark text-light rounded-4 shadow-lg m-3 sign-up-small-padding"
        style={{
          maxWidth: "600px",
          width: "100%",
          boxShadow:
            "0 10px 20px rgba(0, 0, 0, 0.3), 0 6px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "15px",
          padding: "20px 45px"
        }}
      >
        <form className="row g-4" onSubmit={verifyInputsData}>
          <h1
            className="text-warning text-center mb-4 fw-bold pt-3 sign-in-title-mobile"
            style={{
              fontSize: "45px",
              fontFamily: "Poppins",
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)"
            }}
          >
            Sign Up
          </h1>
          <div className="mb-4">
            <label htmlFor="firstName" className="form-label text-warning">
              <h2 className=" mb-2" style={{ fontSize: "24px" }}>
                First Name:
              </h2>
            </label>
            <input
              type="text"
              className="form-control form-control-sm  px-4"
              id="firstName"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              minLength={2}
              required
            />
            {firstNameError && (
              <div
                className="fs-3 text-danger"
                style={{ marginTop: "10px", marginLeft: "40px" }}
              >
                {firstNameError}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="form-label text-warning">
              <h2 className=" mb-2" style={{ fontSize: "24px" }}>
                Last Name:
              </h2>
            </label>
            <input
              type="text"
              className="form-control form-control-sm px-4"
              id="lastName"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              minLength={2}
            />
            {lastNameError && (
              <div
                className="fs-3 text-danger"
                style={{ marginTop: "10px", marginLeft: "40px" }}
              >
                {lastNameError}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label text-warning">
              <h2 className=" mb-2" style={{ fontSize: "24px" }}>
                Email:
              </h2>
            </label>
            <input
              type="email"
              className="form-control form-control-sm  px-4"
              id="email"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && (
              <div className="fs-3 text-danger" style={{ marginTop: "10px" }}>
                {emailError}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-warning">
              <h2 className=" mb-2" style={{ fontSize: "24px" }}>
                Password:
              </h2>
            </label>
            <input
              type="password"
              className="form-control form-control-sm px-4"
              id="password"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className="fs-3 text-danger" style={{ marginTop: "10px" }}>
                {passwordError}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="form-label text-warning"
            >
              <h2 className=" mb-2" style={{ fontSize: "24px" }}>
                Confirm Password:
              </h2>
            </label>
            <input
              type="password"
              className="form-control form-control-sm px-4"
              id="confirmPassword"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <div className="fs-3 text-danger" style={{ marginTop: "10px" }}>
                {confirmPasswordError}
              </div>
            )}
          </div>
          <div className="text-center pb-4">
            <button
              type="submit"
              className="btn btn-warning rounded-pill shadow-lg"
              style={{
                padding: "12px 40px",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
