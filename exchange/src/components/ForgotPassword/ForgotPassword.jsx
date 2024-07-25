import { useState } from "react";
import apiUrl from "../../assets/api_url";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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
          console.log(response);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          if (error.response.status === 400) {
            console.error(
              "The email you provided does not exist in our database:",
              error
            );
          }
        }
      });
  };

  const submitForm = (e) => {
    e.preventDefault();

    setEmailError("");

    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      valid = false;
    }

    if (valid) {
      console.log("Form submitted");
    }

    forgotPassword();
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#181A20", marginTop: "-45px" }}
    >
      <div
        className="bg-dark text-light p-4 rounded-4 shadow-lg"
        style={{
          maxWidth: "600px",
          width: "100%",
          boxShadow:
            "0 10px 20px rgba(0, 0, 0, 0.3), 0 6px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <form className="row g-4" onSubmit={submitForm}>
          <h1
            className="text-warning text-center mb-5 fw-bold pt-3"
            style={{
              fontSize: "48px",
              fontFamily: "Poppins",
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)"
            }}
          >
            Forgot Password
          </h1>
          <p
            className="text-warning text-center mb-5"
            style={{ fontSize: "18px", lineHeight: "1.5" }}
          >
            Enter your email and we will help you reset the password.
          </p>
          <div className="mb-5">
            <label htmlFor="InputEmail" className="form-label text-warning">
              <h2 className="fs-1 mb-4" style={{ marginLeft: "60px" }}>
                Email address:
              </h2>
            </label>
            <input
              type="email"
              className="form-control form-control-sm rounded-pill px-4"
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
              <div
                className="fs-4 text-danger mt-3"
                style={{ marginLeft: "40px" }}
              >
                {emailError}
              </div>
            )}
          </div>
          <div className="text-center mb-5">
            <button
              type="submit"
              className="btn btn-warning rounded-pill shadow-lg"
              style={{
                padding: "14px 50px",
                fontSize: "20px",
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
