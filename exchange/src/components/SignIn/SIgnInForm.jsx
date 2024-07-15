import "./SignInForm.css";
import { useState } from "react";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] =useState("");
    const [passwordError, setPasswordError] =useState("");


    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    const submitForm = (e) => {
        e.preventDefault()
             
        setEmailError("")
        setPasswordError("")

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
        }

    }

    return(
        <>
        <h1>Sign in</h1>
        <form>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label-email">Email address</label>
              <input onChange={(e) => {setEmail(e.target.value)}} type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp"></input>
              {emailError && <div className="error-message">{emailError}</div>}
             </div>
          <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label-password">Password</label>
              <input onChange={(e) => {setPassword(e.target.value)}} type="password" className="form-control" id="InputPassword" ></input>
              {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
          <div className="mb-3-form-check">
              <input type="checkbox" className="form-check-input" id="Check1"></input>
              <label className="form-check-label" htmlFor="Check1">Remember me</label>
          </div>
          <button onClick={submitForm} type="submit" className="btn-primary">Submit</button>
        </form>
        </>
    );
}

export default SignIn;
