/* eslint-disable react-hooks/rules-of-hooks */
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SIgnInForm";
import Home from "./components/home/Home";
import SignUp from "./components/SignUp/SignUp";
import About from "./components/About/About";
import Privacy from "./components/Privacy/Privacy";
import Cookie from "./components/Cookie/Cookie";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  // Here is the default state of the app.
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Changes the app route.
  const onRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  // Changes the app signin status.
  const onSignedInChange = (boolValue) => {
    setIsSignedIn(boolValue);
  };

  let navigate = useNavigate();

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      console.log("am intrat in useEffect");

      if (accessToken) {
        try {
          const response = await axios.get(
            "http://192.168.170.158:8080/auth/verifyAccessToken",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );

          // Token valid
          if (response.status === 200 || response.status === 201) {
            setIsSignedIn(true);
            setRoute("home");
            navigate("/home");
            return;
          }
          // Token invalid
          else if (response.status === 401) {
            console.warn("Access token invalid. Attempting to refresh.");

            // Attempt to obtain a new `accessToken` with `refreshToken`
            if (refreshToken) {
              try {
                const refreshResponse = await axios.post(
                  "http://192.168.170.158:8080/auth/getNewAccessToken",
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

                  // Check again if the new token is valid
                  const verificationResponse = await axios.get(
                    "http://192.168.170.158:8080/checkAccessToken",
                    {
                      headers: {
                        Authorization: `Bearer ${newAccessToken}`
                      }
                    }
                  );

                  if (
                    verificationResponse.status === 200 ||
                    verificationResponse.status === 201
                  ) {
                    setIsSignedIn(true);
                    setRoute("home");
                    navigate("/home");
                  }
                }
              } catch (refreshError) {
                console.error(
                  "Failed to refresh access token. Please log in again.",
                  refreshError
                );
                // Handle user re-authentication here
              }
            }
          }
        } catch (error) {
          console.error("Error checking access token.", error);
          // Here you can handle errors appropriately
        }
      } else {
        // No access token exists, use authentication logic (for example, navigate to the sign-in page)
        navigate("/signin");
      }
    };

    checkAccessToken();
  }, []);

  const signOut = () => {
    // Reset application state
    setRoute("signin");
    setIsSignedIn(false);

    // Redirect to the signIn page
    navigate("/signin");

    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Here is an request to invalidate the session on the server
    // Here is a request to invalidate the session on the server
    axios
      .post(
        "http://192.168.170.158:8080/auth/logout",
        {},
        {
          // Body is empty if no additional data is needed
          headers: {
            Authorization: `Bearer ${accessToken}` // Add Authorization header with Bearer token
          }
        }
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);

          // Remove access and refresh tokens from local storage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          console.log("User logged out successfully");
          // Redirect to the signIn page after successful logout
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div>
      <Navigation
        isSignedIn={isSignedIn}
        onSignedInChange={onSignedInChange}
        onRouteChange={onRouteChange}
        signOut={signOut}
      ></Navigation>

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                route === "home"
                  ? "/home"
                  : route === "signin"
                  ? "/signin"
                  : route === "cookie"
                  ? "/cookie"
                  : route === "privacy"
                  ? "/privacy"
                  : route === "about"
                  ? "/about"
                  : route === "forgotpassword"
                  ? "/forgotpassword"
                  : route === "changePassword"
                  ? "/changePassword"
                  : "/register"
              }
            ></Navigate>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <Home
              setRoute={setRoute}
              setIsSignedIn={setIsSignedIn}
              signOut={signOut}
            />
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <SignIn
              onRouteChange={onRouteChange}
              setIsSignedIn={setIsSignedIn}
            ></SignIn>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <SignUp
              onRouteChange={onRouteChange}
              setIsSignedIn={setIsSignedIn}
            ></SignUp>
          }
        ></Route>
        <Route path="/about" element={<About></About>} />
        <Route path="/privacy" element={<Privacy></Privacy>} />
        <Route path="/cookie" element={<Cookie />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/changePassword"
          element={<ChangePassword></ChangePassword>}
        ></Route>
        <Route
          path="*"
          element={<Navigate to={"/register"}></Navigate>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
