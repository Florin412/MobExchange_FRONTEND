import { useState } from "react";
import apiUrl from "../../assets/api_url";
import axios from "axios";
import "../SignIn/SignInForm.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState(""); // New state for server error message

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const forgotPassword = () => {
    const url = apiUrl + "/auth/forgotPassword";

    axios
      .post(url, { email })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          alert("Check your email, there you can change your password");
          // console.log(response);
          setServerError(""); // Clear previous server errors
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          if (error.response.status === 400) {
            // Set the server error message to display in the UI
            setServerError(
              "The email you provided does not exist in our database."
            );
          } else {
            setServerError(
              "An unexpected error occurred. Please try again later."
            );
          }
        }
      });
  };

  const submitForm = (e) => {
    e.preventDefault();

    setEmailError("");
    setServerError(""); // Clear previous server errors

    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      valid = false;
      return;
    }

    if (valid) {
      // console.log("Form submitted");
    }

    forgotPassword();
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#181A20", minHeight: "90vh" }}
    >
      <div
        className="bg-dark text-light rounded-4 shadow-lg m-3 sign-in-small-padding "
        style={{
          maxWidth: "600px",
          width: "100%",
          boxShadow:
            "0 10px 20px rgba(0, 0, 0, 0.3), 0 6px 6px rgba(0, 0, 0, 0.1)",
          padding: "20px 45px"
        }}
      >
        <form className="row g-4" onSubmit={submitForm}>
          <h1
            className="text-warning text-center mb-5 fw-bold pt-3 sign-in-title-mobile"
            style={{
              fontSize: "45px",
              fontFamily: "Poppins",
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)"
            }}
          >
            Forgot Password
          </h1>
          <p
            className="text-warning text-center mb-5"
            style={{ fontSize: "21px", lineHeight: "1.5" }}
          >
            Enter your email and we will help you reset the password.
          </p>
          <div className="mb-5">
            <label htmlFor="InputEmail" className="form-label text-warning">
              <h2 className=" mb-4" style={{ fontSize: "24px" }}>
                Email address:
              </h2>
            </label>
            <input
              type="email"
              className="form-control form-control-sm  px-4"
              id="InputEmail"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && (
              <div
                className="fs-4 text-danger mt-3"
                style={{ marginLeft: "40px" }}
              >
                {emailError}
              </div>
            )}

            {serverError && ( // Display the server error if it exists
              <div className="fs-4 text-danger mt-3">{serverError}</div>
            )}
          </div>

          <div className="text-center mb-5">
            <button
              type="submit"
              className="btn btn-warning rounded-pill shadow-lg"
              style={{
                padding: "14px 50px",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
