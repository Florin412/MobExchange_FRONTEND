import { useState } from "react";
import "./ChangePassword.css"; // Importul fișierului CSS

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    let valid = true;

    if (!currentPassword) {
      setCurrentPasswordError("Current password is required.");
      valid = false;
    }

    if (!newPassword) {
      setNewPasswordError("New password is required.");
      valid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError("New password must be at least 6 characters long.");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      valid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    if (valid) {
      console.log("Password change submitted");
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-form">
        <form className="row g-3" onSubmit={submitForm}>
          <h1 className="display-1 text-warning mb-4">Change Password</h1>
          <div className="mb-5 text-start">
            <div className="col-md-12 mb-5">
              <label
                htmlFor="InputCurrentPassword"
                className="form-label text-warning"
              >
                <h2 className="fs-1 mb-3 text-start">Current Password:</h2>
              </label>
              <input
                type="password"
                className="form-control form-control-sm rounded-5"
                id="InputCurrentPassword"
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
              {currentPasswordError && (
                <div className="fs-3 error-message text-danger">
                  {currentPasswordError}
                </div>
              )}
            </div>
            <div className="col-md-12 mb-1">
              <label
                htmlFor="InputNewPassword"
                className="form-label text-warning"
              >
                <h2 className="fs-1 mb-3 text-start">New Password:</h2>
              </label>
              <input
                type="password"
                className="form-control form-control-sm rounded-5"
                id="InputNewPassword"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              {newPasswordError && (
                <div className="fs-3 error-message text-danger">
                  {newPasswordError}
                </div>
              )}
            </div>
            <div className="col-md-12 mb-1">
              <label
                htmlFor="InputConfirmPassword"
                className="form-label text-warning"
              >
                <h2 className="fs-1 mb-3 text-start">Confirm Password:</h2>
              </label>
              <input
                type="password"
                className="form-control form-control-sm rounded-5"
                id="InputConfirmPassword"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {confirmPasswordError && (
                <div className="fs-3 error-message text-danger">
                  {confirmPasswordError}
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="fs-2 btn btn-lg btn-warning rounded-pill"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
