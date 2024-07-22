import { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const submitForm = (e) => {
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
                fontFamily: "Poppins"
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
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    marginTop: "-50px",
                    minHeight: "80vh",
                }}
            >
                <form className="row g-3" onSubmit={submitForm}>
                    <h1 className="Sign display-1 text-warning mb-4" style={{ fontSize: "40px", fontFamily: "Poppins" }}>Sign in</h1>
                    <div className="mb-5 text-start">
                        <div className="col-md-12 mb-5">
                            <label htmlFor="InputEmail" className="form-label text-warning">
                                <h2 className="fs-1 mb-3 text-start" style={{ marginTop: "50px", marginLeft: "40px" }}>Email address:</h2>
                            </label>
                            <input
                                type="email"
                                className="form-control form-control-sm rounded-5"
                                id="InputEmail"
                                style={{ fontSize: "20px", padding: "5px" }}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            {emailError && <div className="fs-3 error-message text-danger" style={{ marginLeft: "40px", marginTop: "10px" }}>{emailError}</div>}
                        </div>
                        <div className="col-md-12 mb-1">
                            <label htmlFor="InputPassword" className="form-label text-warning">
                                <h2 className="fs-1 mb-3 text-start" style={{ marginLeft: "40px" }}>Password:</h2>
                            </label>
                            <input
                                type="password"
                                className="form-control form-control-sm rounded-5"
                                id="InputPassword"
                                style={{ fontSize: "20px", padding: "5px" }}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            {passwordError && <div className="fs-3 error-message text-danger" style={{ marginLeft: "40px", marginTop: "10px" }}>{passwordError}</div>}
                        </div>
                    </div>
                    <div className="text-center mb-5">
                        <Link to="/forgotpassword" className="text-warning text-decoration-none fs-2">Forgot Password</Link>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-lg btn-warning rounded-pill px-5 py-2"
                            style={{ fontSize: "20px" }}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
