/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import apiUrl from "../../assets/api_url";

const ChangePassword = ({ signOut }) => {
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
      changePassword();
    }
  };

  const changePassword = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.post(
        `${apiUrl}/auth/changePassword`,
        {
          oldPassword: currentPassword,
          newPassword: newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Password changed successfully");
        signOut();
      } else if (response.status === 400) {
        console.log("Old password doesn't match / invalid new password format");
      } else if (response.status === 401) {
        // Token expired.
        // Attempt to obtain a new `accessToken` with `refreshToken`
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(
              `${apiUrl}/auth/getNewAccessToken`,
              {
                headers: {
                  Authorization: `Bearer ${refreshToken}`
                }
              }
            );

            if (refreshResponse.status === 200) {
              const newAccessToken = refreshResponse.data.accessToken;
              const newRefreshToken = refreshResponse.data.refreshToken;

              localStorage.setItem("accessToken", newAccessToken);
              localStorage.setItem("refreshToken", newRefreshToken);

              changePassword();
            }
          } catch (refreshError) {
            console.error(
              "Failed to refresh access token. Please log in again.",
              refreshError
            );
          }
        }
      }
      // return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundColor: "#181A20",
        paddingTop: "20px",
        marginTop: "0px"
      }}
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
            className="text-warning text-center mb-4 fw-bold"
            style={{
              fontSize: "48px",
              fontFamily: "Poppins",
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)"
            }}
          >
            Change Password
          </h1>
          <p
            className="text-warning text-center mb-4"
            style={{ fontSize: "20px" }}
          >
            Enter your current password, new password, and confirm your new
            password to proceed.
          </p>
          <div className="mb-4">
            <label
              htmlFor="InputCurrentPassword"
              className="form-label text-warning"
            >
              <h2 className="fs-1 mb-2" style={{ marginLeft: "60px" }}>
                Current Password:
              </h2>
            </label>
            <input
              type="password"
              className="form-control form-control-sm rounded-pill px-4"
              id="InputCurrentPassword"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {currentPasswordError && (
              <div
                className="fs-3 text-danger"
                style={{ marginTop: "10px", marginLeft: "40px" }}
              >
                {currentPasswordError}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="InputNewPassword"
              className="form-label text-warning"
            >
              <h2 className="fs-1 mb-2" style={{ marginLeft: "60px" }}>
                New Password:
              </h2>
            </label>
            <input
              type="password"
              className="form-control form-control-sm rounded-pill px-4"
              id="InputNewPassword"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {newPasswordError && (
              <div
                className="fs-3 text-danger"
                style={{ marginTop: "10px", marginLeft: "40px" }}
              >
                {newPasswordError}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="InputConfirmPassword"
              className="form-label text-warning"
            >
              <h2 className="fs-1 mb-2" style={{ marginLeft: "60px" }}>
                Confirm Password:
              </h2>
            </label>
            <input
              type="password"
              className="form-control form-control-sm rounded-pill px-4"
              id="InputConfirmPassword"
              style={{
                fontSize: "20px",
                padding: "5px",
                maxWidth: "510px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <div
                className="fs-3 text-danger"
                style={{ marginTop: "10px", marginLeft: "40px" }}
              >
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
