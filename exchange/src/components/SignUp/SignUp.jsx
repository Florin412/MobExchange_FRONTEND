import { useRef, useState } from "react";
import "./SignUp.css";

function SignUp() {
  // Refs for each input field
  const firstNameRef = useRef("name");
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const confirmEmailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [submit, setSubmit] = useState(false);
  const [inputValue, setInputValue] = useState(); // State to store input value

  // Event handler for input change
  const handleChange = (ref) => {
    setInputValue(ref.current.value);
    console.log(inputValue);
  };

  // Click handler for submit button
  const clickButton = (event) => {
    event.preventDefault();
    setSubmit(true);

    if (
      firstNameRef.current.value === "" ||
      lastNameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      return <p>Fill the inputs</p>;
    }

    if (
      passwordRef.current.value.length() < 6 ||
      passwordRef.current.value.length() > 20
    ) {
      return <p>Password between 6-20</p>;
    }
    return {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="form_base" onSubmit={submitForm}>
        <h1 className="signupTitle">Sign up</h1>
        <div className="mb-3">
          <div className="FullName">
            <div>
              <div className="col-auto">
                <label htmlFor="inputPassword6" className="col-form-label">
                  <h2>First Name </h2>
                </label>
              </div>
              <div className="col-auto">
                <input
                  ref={firstNameRef}
                  onChange={() => handleChange(firstNameRef, firstNameRef)}
                  type="text"
                  id="inputText1"
                  className="form-control shadow py-2 px-3 bg-body rounded hover_input"
                  aria-describedby="passwordHelpInline"
                />
              </div>
            </div>
            <div>
              <div className="col-auto">
                <label htmlFor="inputPassword7" className="col-form-label">
                  <h2>Last Name </h2>
                </label>
              </div>
              <div className="col-auto">
                <input
                  ref={lastNameRef}
                  onChange={() => handleChange(lastNameRef)}
                  type="text"
                  id="inputText2"
                  className="form-control shadow p-2 bg-body rounded hover_input"
                  aria-describedby="passwordHelpInline"
                />
              </div>
            </div>
          </div>

          <div className="col-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h2>Email </h2>
            </label>
            <input
              ref={emailRef}
              onChange={() => handleChange(emailRef)}
              type="email"
              className="form-control shadow p-2  bg-body rounded hover_input"
              id="inputText3"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="col-auto">
            <label htmlFor="exampleInputEmail2" className="form-label">
              <h2>Confirm email </h2>
            </label>
            <input
              ref={confirmEmailRef}
              onChange={() => handleChange(confirmEmailRef)}
              type="email"
              className="form-control shadow p-2  bg-body rounded hover_input"
              id="inputText4"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="col-auto">
            <label htmlFor="exampleInputEmail3" className="form-label">
              <h2>Password </h2>
            </label>
            <input
              ref={passwordRef}
              onChange={() => handleChange(passwordRef)}
              type="password"
              className="form-control shadow p-2 bg-body rounded hover_input"
              id="pass1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="col-auto">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <h2>Confirm password </h2>
            </label>
            <input
              ref={confirmPasswordRef}
              onChange={() => handleChange(confirmEmailRef)}
              type="password"
              className="form-control shadow p-2 mb-3 bg-body rounded hover_input"
              id="pass2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark btn-lg rounded-5 px-5 py-3"
          onClick={clickButton}
        >
          {submit ? (
            <div>
              <h3 className="fs-5">Success</h3>
              <h3>You will be redirected to login</h3>
            </div>
          ) : (
            <h3 className="fs-5">Submit</h3>
          )}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
