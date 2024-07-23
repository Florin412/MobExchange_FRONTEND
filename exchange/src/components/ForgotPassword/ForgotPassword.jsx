import { useState } from "react";

function SignIn() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] =useState("");

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    const submitForm = (e) => {
        e.preventDefault()
             
        setEmailError("")

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
    }

    return(
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
                    padding: "30px", // Micșorează padding-ul pentru a micșora dimensiunea casetei
                    borderRadius: "15px", // Reduce raza colțurilor pentru a face caseta mai compactă
                    width: "100%",
                    maxWidth: "500px", // Reduce lățimea maximă a casetei
                    textAlign: "center",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    marginTop: "-50px", // Ridică caseta
                    minHeight: "70vh", // Ajustează înălțimea minimă a casetei
                }}
            >
                <form className="row g-5" onSubmit={submitForm} style={{ marginTop: "5px" }}>
                    <h1 className="Sign display-1 text-warning mb-4" style={{ fontSize: "40px", fontFamily: "Poppins" }}>Forgot Password</h1>
                    <div className="mb-5 text-start">
                        <div className="col-md-12 mb-5">
                            <label htmlFor="InputEmail" className="form-label text-warning">
                                <h2 className="fs-1 mb-3 text-start" style={{ marginTop: "50%", marginLeft: "40px" }}>Email address:</h2>
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
                    </div>
                    <div className="mt-auto text-center">
                        <button
                            type="submit"
                            className="btn btn-warning btn-lg rounded-pill px-5 py-2"
                            style={{ marginTop: "20%", marginBottom: "20px", fontSize: "18px" }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
