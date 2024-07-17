import { useRef, useState } from "react";
import "./SignUp.css";

function SignUp() {
  // Refs for each input field
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const confirmEmailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState("Submit");
  const [inputValue, setInputValue] = useState(); // State to store input value
  const [accountValues, setAccountValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // Delete the console.log after you get data from backend.
  console.log(accountValues);

  // Event handler for input change
  const handleChange = (ref) => {
    setInputValue(ref.current.value);
    console.log(inputValue);
  };

  // Click handler for submit button
  const clickButton = (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    if (
      firstNameRef.current.value === "" ||
      lastNameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      confirmPasswordRef.current.value === ""
    ) {
      return setMessage("Fill all the inputs");
    }

    // Validate password length
    if (
      passwordRef.current.value.length < 6 ||
      passwordRef.current.value.length > 20
    ) {
      return setMessage("Password must be between 6-20 characters");
    }

    // Validate email match
    if (emailRef.current.value !== confirmEmailRef.current.value) {
      return setMessage("Emails do not match");
    }

    // Validate password match
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setMessage("Passwords do not match");
    }

    // If all validations pass, set success message and clear input values
    setMessage("Success");

    // Clear input fields
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    confirmEmailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";

    // Reset the state for accountValues
    setAccountValues({
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    });

    // Reset the submit state and message after a short delay
    setTimeout(() => {
      setSubmit(false);
      setMessage("Submit");
    }, 2000); // Reset submit state and message after 2 seconds
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#181A20",
        padding: "20px",
      }}
    >
      <div
        className="signin-form"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "30px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <form className="row g-3" onSubmit={submitForm}>
          <h1 className="Sign display-1 text-warning mb-4" style={{ fontSize: "40px", fontFamily: "Poppins" }}>Sign up</h1>
          <div className="mb-3">
            <div className="col-md-12 mb-3">
              <label htmlFor="inputText1" className="form-label text-warning">
                <h2 className="mb-2 text-start">First Name:</h2>
              </label>
              <input
                ref={firstNameRef}
                type="text"
                className="form-control form-control-sm rounded-5"
                id="inputText1"
                style={{ fontSize: "15px", padding: "10px", marginTop: "-10px" }}
                onChange={() => handleChange(firstNameRef)}
              />
            </div>
            <div className="col-md-12 mb-3" style={{ marginTop: "-40px" }}>
              <label htmlFor="inputText2" className="form-label text-warning">
                <h2 className="mb-2 text-start">Last Name:</h2>
              </label>
              <input
                ref={lastNameRef}
                type="text"
                className="form-control form-control-sm rounded-5"
                id="inputText2"
                style={{ fontSize: "15px", padding: "10px", marginTop: "-10px" }}
                onChange={() => handleChange(lastNameRef)}
              />
            </div>
          </div>
          <div className="mb-3" style={{ marginTop: "-50px" }}>
            <label htmlFor="inputEmail" className="form-label text-warning">
              <h2 className="mb-2 text-start" >Email:</h2>
            </label>
            <input
              ref={emailRef}
              type="email"
              className="form-control form-control-sm rounded-5"
              id="inputEmail"
              style={{ fontSize: "15px", padding: "10px", marginTop: "-10px" }}
              onChange={() => handleChange(emailRef)}
            />
          </div>
          <div className="mb-3" style={{ marginTop: "-40px" }}>
            <label htmlFor="inputConfirmEmail" className="form-label text-warning">
              <h2 className="mb-2 text-start">Confirm Email:</h2>
            </label>
            <input
              ref={confirmEmailRef}
              type="email"
              className="form-control form-control-sm rounded-5"
              id="inputConfirmEmail"
              style={{ fontSize: "15px", padding: "10px", marginTop: "-10px" }}
              onChange={() => handleChange(confirmEmailRef)}
            />
          </div>
          <div className="mb-3" style={{ marginTop: "-40px" }}>
            <label htmlFor="inputPassword" className="form-label text-warning">
              <h2 className="mb-2 text-start">Password:</h2>
            </label>
            <input
              ref={passwordRef}
              type="password"
              className="form-control form-control-sm rounded-5"
              id="inputPassword"
              style={{ fontSize: "15px", padding: "10px", marginTop: "-10px" }}
              onChange={() => handleChange(passwordRef)}
            />
          </div>
          <div className="mb-3" style={{ marginTop: "-40px" }}>
            <label htmlFor="inputConfirmPassword" className="form-label text-warning">
              <h2 className="mb-2 text-start">Confirm Password:</h2>
            </label>
            <input
              ref={confirmPasswordRef}
              type="password"
              className="form-control form-control-sm rounded-5"
              id="inputConfirmPassword"
              style={{ fontSize: "15px", padding: "10px", marginTop: "-10px" }}
              onChange={() => handleChange(confirmPasswordRef)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-lg btn-warning rounded-pill" // Added btn-lg class to increase button size
              style={{ marginTop: "-20px", padding: "10px 45px", fontSize: "40px" }} 
              onClick={clickButton}
            >
              {submit ? (
                <div>
                  <h3 className="fs-7" style={{ marginTop: "3px" }}>{message}</h3>
                </div>
              ) : (
                <h3 className="fs-7" style={{ marginTop: "3px" }}>{message}</h3>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
