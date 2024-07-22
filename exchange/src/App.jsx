import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SIgnInForm";
import Home from "./components/home/Home";
import SignUp from "./components/SignUp/SignUp";
import About from "./components/About/About";
import Privacy from "./components/Privacy/Privacy";
import Cookie from "./components/Cookie/Cookie";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  // Here is the default state of the app.
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignIn] = useState(false);

  // Changes the app route.
  const onRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  // Changes the app signin status.
  const onSignedInChange = (boolValue) => {
    setSignIn(boolValue);
  };

  return (
    <div>
      <Navigation
        isSignedIn={isSignedIn}
        onSignedInChange={onSignedInChange}
        onRouteChange={onRouteChange}
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
                  : "/register"
              }
            ></Navigate>
          }
        ></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/register" element={<SignUp></SignUp>}></Route>
        <Route path="/about" element={<About></About>} />
        <Route path="/privacy" element={<Privacy></Privacy>} />
        <Route path="/cookie" element={<Cookie />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="*"
          element={<Navigate to={"/register"}></Navigate>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
